# Cafe-Management-System

Authors: Ana Macedo Oliveira, Andrea Sandez, Kevin Tran, Marcella Thomas

This is our Github repository for The Café Management System that we have built for Software Engineering II.
The Café Management System is a program designed to help a small café to manage daily tasks such as taking orders, processing payments and keeping stock of orders and stock. There are three actors, or users - customers, staff, and admin.

How to run:

1. Download the files onto your machine.
   
2. Install Node.js and MySQL
   ```
   brew install node
   brew install mysql
   ```
   OR check if you have them installed
   ```
   node -v
   npm -v
   mysql --version
   ```
3. Open server/db.js and change the root password from '0000' to your root password
   
4. Start MySQL and create a local database called cafe_db
   ```
   brew services start mysql
   mysql -u root -p
   ```
   Once you're in the MySQL shell (mysql> prompt), run:
   ```
   CREATE DATABASE cafe_db;
   ```
   Exit MySQL.
   ```
   exit;
   ```
   
5. On your terminal or a program such as VSCode, change the directory into server and execute node index.js
   ```
   cd cafe-management-system/server
   node index.js
   ```
6. Install Cors if necesary
   ```
   npm install cors
   ```

7. On a new terminal window, change the directory to client
   ```
   cd cafe-management-system/client
   ```
   
8. Install npm in the client directory and start the application
   ```
   npm install
   npm start
   ```

   Check permissions if needed
   ```
   chmod +x ./node_modules/.bin/react-scripts
   ```

   
