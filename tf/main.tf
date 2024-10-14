provider "aws" {
  region = var.aws_region
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  
  tags = {
    Name = "${var.app_name}-vpc"
  }
}

resource "aws_subnet" "public" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
  
  tags = {
    Name = "${var.app_name}-public-subnet"
  }
}

resource "aws_subnet" "private" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.2.0/24"
  
  tags = {
    Name = "${var.app_name}-private-subnet"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  
  tags = {
    Name = "${var.app_name}-igw"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }
  
  tags = {
    Name = "${var.app_name}-public-rt"
  }
}

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

resource "aws_security_group" "ec2" {
  name        = "${var.app_name}-ec2-sg"
  description = "Security group for EC2 instance"
  vpc_id      = aws_vpc.main.id
  
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
    from_port   = 5173
    to_port     = 5173
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  tags = {
    Name = "${var.app_name}-ec2-sg"
  }
}

resource "aws_instance" "app" {
  ami           = "ami-0694d931cee176e7d"  # Amazon Linux 2 AMI (adjust for your region)
  instance_type = var.ec2_instance_type
  subnet_id     = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.ec2.id]
  associate_public_ip_address = true
  key_name      = var.ec2_key_pair
#  iam_instance_profile = aws_iam_instance_profile.ec2_s3_profile.name


  user_data = <<-EOF
              #!/bin/bash
              # Actualizar el sistema
              yum update -y
              
              # Instalar Node.js
              curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
              sudo apt install nodejs -y

              # Instalar Java 21
              amazon-linux-extras enable java-openjdk21
              sudo apt update
              sudo add-apt-repository ppa:openjdk-r/ppa
              sudo apt install openjdk-21-jdk
             

              # Verificar instalaciones
              node --version
              java -version
              EOF

  tags = {
    Name = "${var.app_name}-ec2"
  }
}

resource "aws_db_subnet_group" "main" {
  name       = "${var.app_name}-db-subnet-group"
  subnet_ids = [aws_subnet.private.id, aws_subnet.public.id]
  
  tags = {
    Name = "${var.app_name}-db-subnet-group"
  }
}

resource "aws_security_group" "rds" {
  name        = "${var.app_name}-rds-sg"
  description = "Security group for RDS instance"
  vpc_id      = aws_vpc.main.id
  
  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.ec2.id]
  }
  
  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    #cidr_blocks = ["${var.my_ip}/32"]
    description = "Allow access from my IP"
  }
  
  tags = {
    Name = "${var.app_name}-rds-sg"
  }
}

resource "aws_db_instance" "main" {
  identifier           = "${var.app_name}-db"
  engine               = "postgres"
  engine_version       = "16.4"
  instance_class       = var.db_instance_class
  allocated_storage    = 20
  storage_type         = "gp2"
  db_name              = var.db_name
  username             = var.db_username
  password             = var.db_password
  db_subnet_group_name = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  skip_final_snapshot  = true
  
  tags = {
    Name = "${var.app_name}-rds"
  }
}

resource "aws_iam_role" "ec2_rds_access" {
  name = "${var.app_name}-ec2-rds-access-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy" "rds_access" {
  name = "${var.app_name}-rds-access-policy"
  role = aws_iam_role.ec2_rds_access.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "rds-db:connect"
        ]
        Effect = "Allow"
        Resource = aws_db_instance.main.arn
      }
    ]
  })
}

resource "aws_iam_instance_profile" "ec2_profile" {
  name = "${var.app_name}-ec2-profile"
  role = aws_iam_role.ec2_rds_access.name
}
