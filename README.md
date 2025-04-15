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
   
3. Start MySQL and create a local database called cafe_db
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
   
4. On your terminal or a program such as VSCode, change the directory into client/src and execute node index.js
   ```
   cd cafe-management-system/client/src
   node index.js
   ```

5. On a new terminal window, change the directory to client again
   ```
   cd cafe-management-system/client
   ```
   
6. Install npm in the client directory and start the application
   ```
   npm start
   ```

   Check permissions if needed
   ```
   chmod +x ./node_modules/.bin/react-scripts
   ```

   
