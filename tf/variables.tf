variable "app_name" {
  description = "Name of the application"
  type        = string
  default     = "wealthtrack"
}

variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-west-2"
}

variable "ec2_instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "db_instance_class" {
  description = "RDS instance class"
  type        = string
  default     = "db.t3.micro"
}

variable "db_name" {
  description = "Name of the database"
  type        = string
  default     = "wealthtrackdb"
}

variable "db_username" {
  description = "Username for the database"
  type        = string
  default     = "backend"
}

variable "db_password" {
  description = "Password for the database"
  type        = string
  sensitive   = true
}

variable "ec2_key_pair" {
  description = "Name of the EC2 key pair to use"
  type        = string
}

variable "my_ip" {
  description = "Your local IP address"
  type        = string
}
