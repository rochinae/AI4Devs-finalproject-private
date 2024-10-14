- Crear un EC2 en AWS, que tenga los puertos 80, 443 y 22 abiertos. Asegurarse de que se asocia una clave privada (llave.pem)
- Crear un RDS con motor Postgresql en AWS, que tenga acceso desde el EC2
- Crear un bucket en S3 para almacenar los binarios del frontend y del backend.
- Instalar java, node entre otros en la instancia EC2.
   - Conectarse a la instancia EC2 usando ssh: *ssh -i ruta_a_llave_privada.pem  ubuntu@ip_publico_de_la_instancia_EC2*
   - Ejecutar lo siguiente, uno por uno o con un script:
    ```sh            
              # Instalar Node.js
              curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
              sudo apt install nodejs -y

              # Instalar Java 21
              amazon-linux-extras enable java-openjdk21
              sudo apt update
              sudo add-apt-repository ppa:openjdk-r/ppa
              sudo apt install openjdk-21-jdk           

              # Instalar Nginx y certbot
              sudo apt install nginx
              sudo apt install snapd
              sudo snap install --classic certbot
              sudo ln -s /snap/bin/certbot /usr/bin/certbot



              # Verificar instalaciones
              node --version
              java -version
    ```
   - sudo apt install nginx




- Crear el esquema de la base de datos y de las tablas en la base de datos RDS, usando el fichero @schema.sql
   - *ssh -i ruta_a_llave_privada.pem -L 5430:host_publico_instancia_rds:5432 ubuntu@ip_publico_de_la_instancia_EC2*
   - Usar editor SQL para crear una nueva conexión a base de datos, con localhost:5430 y usuario el puesto durante la creación de la base de datos, así como la contraseña que se usó en ese momento.
   - Ejecutar los scripts de @schema.sql y @data.sql para crear el esquema y cargar los datos de ejemplo.

- Compilar el @backend con maven, y lanzar el jar compilado con java -jar
   - Subir el jar compilado a S3 y generar una url pública para descargar el jar en la carpeta backend
   - Copiar el fichero @application-prod.yml y cambiar los valores, especialmente el de la base de datos (de Auth0 deberían de ser validos).
   - Ejecutar *nohup java -jar backend.jar --spring.profiles.active=prod --spring.config.additional-location=file:path_to_backend-config.yaml &*



- Comprimir la carpeta @frontend en un fichero .zip. No es necesario subir el contenido de la carpeta node_modules. Ponerlo en una carpeta llamada frontend.
    - Hacer *npm install* en la carpeta frontend
    - Hacer *nohup npm run dev --host &*

- Instalar certificado SSL en Nginx desde certbot:
    - La guía a seguir es https://certbot.eff.org/instructions?ws=nginx&os=snap
    - sudo certbot --nginx
    - cuando pregunte el sitio web, poner *wealthtrack.chickenkiller.com*. De otra manera, se puede usar otro pero habrá que cambiar la configuración de auth0 y poner la suya propia.
    - reiniciar nginx *sudo systemctl restart nginx*
              
- El sitio web se puede acceder en https://wealthtrack.chickenkiller.com/
- Usar el usuario y contraseña de auth0 para acceder a la aplicación. (botón de login en la esquina superior derecha)
