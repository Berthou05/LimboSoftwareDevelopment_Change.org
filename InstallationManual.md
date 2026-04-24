# Installation Manual - Unitas System

Created by: The Limbo Software Development

The current file compiles the installation process of the **Unitas System web application** into a Virtual Server that runs the Ubuntu Server OS (this due to the used package manager <code>apt</code>).

The installation process will be divided in 8 steps:

### 1. Creation of User into the Server through SSH protocol.

This step is optional depending if a given user and password different to the root user has been already provided by the owner of the server. 
If you already posses a username \<username\> and a password \<password\> you can proceed to step 2.

For this step the IP adress of the server \<IP_adress\> and the password of the root user \<root_password\> is provided.

```
# Connect into the server as the root user through SSH protocol.
ssh root@<IP_adress>

# Type password once the terminal asks for it:
ssh root@<IP_adress>'s password: <root_password>

# Create a new user for the responsible(s) of the application.
adduser <username>

# Give all privileges of the server to the created username. This allows to do as 
# much as the root user without having to use it, keeping root as a safety net in
# case something happens.
usermod -aG sudo <username>

#  Logout as the root user.
logout
```

### 2. Installation of git and the Node Version Manager.

Once the \<username\> and \<password\> are available is time to connect to the server through the SSH protocol with the responsible account and start installing the required execution environments for the deployment of the Unitas System.

```
# Login as the actual user into the server
ssh <username>@<IP_adress>

# Type password once the terminal asks for it:
ssh <username>>@<IP_adress>'s password: <password>
```

Installation of **control version tool git** to be able to access the Unitas System project.

*Note for the following sections:* **sudo** is a command that lets a permitted user run specific commands with elevated privileges. 

```
# Get the update list of all avaible updates of the server or any application on it.
sudo apt update

# Apply the updates form the update list
sudo apt upgrade

# Install git through the usage of the package manager of Ubuntu 'apt'
sudo apt install git
```

Installation of the **Node Version Manager** by downloading a .sh (shell script) file, running it into bash (terminal) and install the requred version of Node.js (24 in this case).

```
# Install NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Install Node.js 24
nvm install 24

# Verify installation of the node version and npm
node -v  # It should print a result as v.24.x.x
npm -v
```

### 3. Clone the system's repository.

Once both execution environments have been installed, it is turn to clone the git repository that holds the Unitas System: [Here](https://github.com/Berthou05/LimboSoftwareDevelopment_Change.org)

```
# Clone repository
git clone https://github.com/Berthou05/LimboSoftwareDevelopment_Change.org

# Get into the repository folder
cd LimboSoftwareDevelopment_Change.org/

# Install dependencies through npm
npm install

# Initial trial (afterwards type Ctrl + C to stop it)
npm start
```

Up to this point the application at its latest version is already available and downloaded into the server; however, some modifications and additions are still required to set it completely.

### 4. Installing and setting up mysql-server.

In order to store and manage the designed database for the system, a database manager is required to be installed, in this case <code>mysql-server</code> will be installed and set up.

```
# Get the update list of all avaible updates of the server or any application on it.
sudo apt update

# Apply the updates form the update list
sudo apt upgrade

# Install MySQL database manager for servers
sudo apt install mysql-server

# Start the mysql-server service in the designed port (usually 3306)
sudo systemctl start mysql.service

# Access mysql service with others the functionallities of mysql-server
sudo mysql

# Configure a password for the root user of the mysql-server.
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '<database_password>';
exit

# Run secure installation procedure for mysql-server.
sudo mysql_secure_installation
```

The procedure <code>mysql_secure_installation</code> runs a series of questions in order to make more secure (and therefore less accessible) the database manager of mysql.
These questions are shown below as their answer:

1. Validate the password component.

```
Would you like to setup VALIDATE PASSWORD component?
Press y|Y for Yes, any other key for No:
```
If Y, then it will propose three levels for which the one chosen will be the criteria to meet when declaring the password of any other user declared afterwards
```
There are three levels of password validation policy:
LOW    Length >= 8
MEDIUM Length >= 8, numeric, mixed case, special characters
STRONG Length >= 8, dictionary file

Please enter 0 = LOW, 1 = MEDIUM and 2 = STRONG:
```

2. Remove anonymous users
Deletes the possibility to access the database manager without a declared account or password.
```
Remove anonymous users? (Press y|Y for Yes, any other key for No):

# Answer
Y
```

3. Disallow Root Login Remotely
Disables possibility to connect to mysql-server remotely through the root user.
```
Disallow root login remotely? (Press y|Y for Yes, any other key for No):

# Answer
Y
```

4. Remove test database
Removed the table for SQL testing.
```
Remove test database and access to it? (Press y|Y for Yes, any other key for No):

# Answer
Y
```

5. Reload Privilege Tables
Reloads privilege tables for users.
```
Reload privilege tables now? (Press y|Y for Yes, any other key for No):

# Answer
Y
```
Once this procedure its complete, the setup of the mysql-server execution environment is ready to hold the system database.

### 5. Creation of database, database user and scripts loading.

To start, enter the mysql server as the root user declared with the password declared for this user \<database_password\>.
Here we will do the declaration of the database username and password.

```
# Access folder where SQL scripts are available [/sql]
cd sql

# Connect to MySQL
sudo mysql -u root -p

# Create database
CREATE DATABASE unitas_system;

# Create a user and password exclusively for this database in the mysql service.
CREATE USER '<db_username>'@'localhost' IDENTIFIED BY '<db_password>';

# Assign all possible privileges of the unitas_system database to the username \<db_username\>
GRANT ALL PRIVILEGES ON unitas_system.* TO '<bd_username>'@'localhost';

# Restart privileges
FLUSH PRIVILEGES;

# Exit the root user in MySQL
exit
```
Once the responsible has its own username and password, it should prepare the unitas_system database by creating its tables and loading their default information through running the SQL scripts: <code>origin.sql & data_insertion.sql</code> 

Once the scripts have run, testing them in essential to make sure they have worked correctly.

```
# Login into MySQL with its declared user and password
mysql -u <db_username> -p

# Insert database user password when required:
Enter password: <db_password>

# Chose database to use;
USE unitas_system;

# Run the initial database creation SQL script.
SOURCE origin.sql;

# Test database creation by
SHOW TABLES;

# This should return the following response:
+-------------------------+
| Tables_in_unitas_system |
+-------------------------+
| account                 |
| accountrole             |
| achievement             |
| activity                |
| collaboration           |
| dailyentry              |
| employee                |
| employeeteam            |
| goal                    |
| highlight               |
| privilege               |
| project                 |
| projectteam             |
| prompt                  |
| report                  |
| role                    |
| roleprivilege           |
| team                    |
+-------------------------+

# Run the initial database data insertion SQL script.
SOURCE data_insertion.sql;

# Test data insertion by trying:
SELECT * FROM privilege;

# This should return the following response:
+--------------+----------------------------------+-------------+
| privilege_id | name                             | description |
+--------------+----------------------------------+-------------+
| ACC-01       | View account information         | NULL        |
| ACC-02       | Edit account information         | NULL        |
| ADMIN-01     | Views roles                      | NULL        |
| ADMIN-02     | Register roles                   | NULL        |
| ADMIN-03     | Delete roles                     | NULL        |
| ADMIN-04     | Assign privileges to roles       | NULL        |
| ADMIN-05     | Assign roles to accounts         | NULL        |
| ADMIN-06     | Register accounts                | NULL        |
| AL-01        | Submit Daily Entry through Slack | NULL        |
| AL-02        | Edit today Daily Entry           | NULL        |
| AL-03        | View Activity Log entries        | NULL        |
| EMP-01       | View Employee profile            | NULL        |
| EMP-02       | View filtered team memberships   | NULL        |
| EMP-03       | Edit Employee profile            | NULL        |
| EMP-04       | Edit own profile                 | NULL        |
| EMP-05       | View Project participation       | NULL        |
| HS-01        | Global Cross-Entity Search       | NULL        |
| PROJ-01      | Register Project                 | NULL        |
| PROJ-02      | Edit Project                     | NULL        |
| PROJ-03      | Delete Project                   | NULL        |
| PROJ-04      | View Project information         | NULL        |
| PROJ-05-01   | Add Themselve to Project         | NULL        |
| PROJ-05-02   | Add Others to Project            | NULL        |
| PROJ-06      | Remove themselve from Project    | NULL        |
| PROJ-06-02   | Remove others from Project       | NULL        |
| PROJ-07      | View Project participants        | NULL        |
| PROJ-08      | View Project Goals               | NULL        |
| PROJ-09      | Register Project Goal            | NULL        |
| PROJ-10      | Edit Project Goal                | NULL        |
| PROJ-11      | Delete Project Goal              | NULL        |
| PROJ-12      | View Project Achievements        | NULL        |
| PROJ-13      | Register Project Achievement     | NULL        |
| PROJ-14      | Edit Project Achievement         | NULL        |
| PROJ-15      | Delete Project Achievement       | NULL        |
| REP-01       | Generate reports                 | NULL        |
| TEAM-01      | Register Team                    | NULL        |
| TEAM-02      | Edit Team                        | NULL        |
| TEAM-03      | Delete Team                      | NULL        |
| TEAM-04      | View Team information            | NULL        |
| TEAM-05      | View active Team members         | NULL        |
| TEAM-06-01   | Add Themselve to Team            | NULL        |
| TEAM-06-02   | Add Others to Team               | NULL        |
| TEAM-07-01   | Remove themselve from Team       | NULL        |
| TEAM-07-02   | Remove others from Team          | NULL        |
| TEAM-08      | View Team projects               | NULL        |
+--------------+----------------------------------+-------------+

#Exit the MySQL service
exit
```

### 6. Manual addition of the environment variables file (.env)

Another requirement needed for the application to work correctly is to have a <code>.env</code> file that contains the environmental variables of the system. For this the responsible must have all environmental variables at hand (these must be provided by the Limbo Software Development team through a secure method) in order to create them.

For the creation of this file, nano will be used. **nano** is a terminal-based text editor.

```
# Exit the /sql folder
cd ..

# Creation of the .env file in the main folder of the project.
nano .env

#Inside nano type all the specified environment varibles as 
---------------------------
PASSWORD=XXXXXXXXXXXXXX
KEY=XXXXXXXXXXXXXXX
etc.
---------------------------

#Once finished use Ctrl+O to save it and Ctrl+X to exit the document.
```

### 7. Configure PM2 (Process Manager for Node.js)

Now that the app, the database and the environent variables are available, a process manager is needed.

A **process manager** is a tool that controls and maintains the execution of applications (processes) on a system. These handle responsibilities as:
- Starting and stopping applications.
- Restarting if they have a crush.
- Handling multiple processes.
- Running them in the background.

The process manager for the Unitas System is **PM2**.

```
# Install PM2 globally
npm install pm2@latest -g

# Start the application with PM2
pm2 start app.js --name "unitas"

# Verify the app works correctly
curl localhost:3000

# You can consult this by accessing the web application from a different device broswer typing: http:<ID_adress>/3000

# Save configuration for self-start
pm2 save

# Start the application through PM2.
pm2 startup
```
Some usefuls commands to know related to PM2 are:

```
# Shows active processes in real time that PM2 is running. 
pm2 list

# Shos the app logs in real time
pm2 logs

# Shows the console of the server in relation to the processes PM2 is running.
pm2 monit
```

### 8. Install and setting up Caddy (Reverse Proxy)

Finally, **Caddy** is installed and configured as a **reverse proxy**.

A **reverse proxy** is a server that sits in front of one or more backend servers and forwards client requests to them. This attracts all calls to the domain or IP address of the server towards itself in order to redirect them towards the ports the administrator desires to use.

```
# Add Caddy's repository from the Debian archive.
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl

curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg

curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list

# Get the update list of all avaible updates of the server or any application on it.
sudo apt update

# Apply the updates form the update list
sudo apt upgrade

# Install Caddy
sudo apt install caddy

# Verify installation
caddy help
```

In order for Caddy to work correctly, the creation of anothe file, similar to the one handled with the .env file is required.

In the **Caddyfile** if given a domain in the \<web_page_domain\>, the application of the https protocole will be automatic; otherwise if given a port, all calls to that port will be redistributed to the inner port mentioned.

```
# Create Caddyfile file
nano Caddyfile

# Write the content of the actual Caddyfile
---------------------------

:<web_page_domain> {
  reverse_proxy localhost:3000
}

---------------------------

#Once finished use Ctrl+O to save it and Ctrl+X to exit the document.

# Start Caddy
sudo caddy start
```

**Congratulations!** Unitas System is functional and compleyely operational with an empty database at the specified domain.

## Deployment Diagram

The following diagram shows the devices and execution environments used for the deployment of the Unitas System which will be explained in detail, paying special attention to the client and server devices and characteristics.

<br>
<img width="1321" height="691" alt="UnitasSystemDeploymentDiagram drawio" src="https://github.com/user-attachments/assets/526b118d-0915-45de-99f0-155659ef14ff" />
<br>

**Client Side**
Unitas System is focused to work in MacOS in the following browsers:
- Safari 26
- Firefox 149.0.2
- Chrome 147.0.7727.101

This is due to the devices yet similar browsers of the final users of Unitas.

**Server Side**
There is only one server that is currently deploying the Unitas System.
This must contain the following executable environments in order to work correctly:
- Caddy (Reverse Proxy)
- PM2 (Process Manager)
- NVM (Node Version Manager)
  - Node 24
  - NPM
- MySQL server (Database Manager)

The Unitas System employs two web services:
- OpenAI (Artificial Intelligence processing)
- Resend (Email sender API)
