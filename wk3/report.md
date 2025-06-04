# Week 3 Mini PHP Blog Web Application
## TL;DR
* This project is based on pure PHP (no external frameworks used) + MySQL database.
* This project contains `Dockerfile` and `compose.yml` to allow easier distribution and deployment.
* This project has registeration, login, and logout features in terms of user handling, and CRUD for posts handling.
* Admin privilege and private post uploads are implemented as additional features.
<br></br>

## Project Overview
* This repository contains a simple, PHP-based mini blog web app
* The key functionalities are: registeration, login, and blog posts CRUD
* Authenticated users can perform full CRUD operations on their own posts, while an administrative user has rights to manage all posts. 
* Posts can be marked "Only me" (private), meaning they are visible only to the authors and to the admin. 
* The application is containerized using Docker for easy setup, deployment, and distribution.</p>
<br></br>

## File Structure
#### The wk3 directory of the repository contains the following key components:
* `./Dockerfile` – Defines a custom Docker image for the application.
* `./compose.yml` – A Docker Compose configuration file that describes a multi-container setup. It defines two services: client (PHP-based frontend) and db (MySQL).
* `./db/init/init.sql` – SQL initialization script that is executed when the MySQL container first starts. It creates the database and defines the structure of the `users` and `posts` tables.
* `./src/index.php` – The main PHP application script. This single file contains all server-side logic for the app, as well as rendering the HTML interface. It connects to the MySQL database via PDO and uses PHP sessions to track users' login status.
<br></br>

## Docker Environment Setup
### `Dockerfile` Setup:
* The `Dockerfile` specifies how to build the web application container. It starts `FROM php:apache`, which is an image bundling PHP with the Apache HTTP server. This ensures that no other web server setup is required on deployment and distribution.
* The Dockerfile then updates the package manager and installs the `PHP MySQLi` extension (needed to let PHP communicate with MySQL database) using the `docker-php-ext-install mysqli` command. This ensures that PHP’s MySQL functions (via `PDO`) will work.
* The server is open in the port 80.
* Finally, the container’s entrypoint runs `apache2-foreground` to start the Apache server.

### `compose.yml` setup
* The `compose.yml` structures the application into two main services.
1. Client side: The client side is built from the local Dockerfile (build: .) to create the PHP/Apache container running the blog app. It is named `"php-blog-client"` for identification. The web container maps port 80 to port 8080, so the application is accessible at `localhost:8080` in a browser, once the docker image is live.
2. DB side: The DB side uses the MySQL image (`mysql:latest`) to provide a database for the application. It is run under the name `"php-blog-db"`. Environment variables are provided to initialize the database: a root password, a MySQL username (exampleuser) and its password (examplepass), and the database name (exampledb). On container startup, MySQL will automatically run the init.sql script in this directory to create the exampledb database and its tables, based on the schema written.
