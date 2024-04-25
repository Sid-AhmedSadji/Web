# Web Forum App

This application is a web forum where users can create topics and respond to them. Users have limited access to the site and cannot access messages until they have been authorized by an admin.

## Technologies Used & API Calls

### Technologies Used

 **Node.js**: JavaScript runtime environment
 **Express.js**: Web framework for Node.js
 **React.js**: JavaScript library for building user interfaces
 **MongoDB**: NoSQL database
 **Express Session**: Middleware for session management in Express.js

These technologies are used specifically for handling database queries.

Additionally, some elements of the frontend are sourced from open-source projects.

### API Calls

All requests to the database from the frontend are handled through the `apiCalls.js` file. This file contains methods for interacting with the server's API endpoints, including user authentication, message posting, user management, and more.

Here's a summary of the main functionalities provided by `apiCalls.js`:

 **Authentication**:
  - `login(props)`: Logs in the user.
  - `logout()`: Logs out the user.
  - `checkSession()`: Checks the user's session status.

 **User Management**:
  - `postUser(props)`: Registers a new user.
  - `changeTypeUser(props)`: Changes the type of a user.
  - `getUser(props)`: Retrieves user information.

 **Message Posting**:
  - `postMessage(props)`: Posts a new message.
  - `getMessages(props)`: Retrieves messages.
  - `deleteMessage(id)`: Deletes a message.

## Configuration

1. **Install Dependencies**: Before starting the application, make sure to install all dependencies by running the following command in both the `FRONT` and `server` directories:
   ```
   npm install
   ```

2. **Start the Server**: Launch the server by running the following command from the `server` directory:
   ```
   npm start
   ```

3. **Start the Frontend Application**: To start the frontend application, navigate to the `FRONT` directory and run the following command:
   ```
   npm run dev 
   ```

4. **Open Your Browser**: After starting the server and frontend application, open your web browser and go to `localhost:5173`.

5. **Default Admin User**: By default, the application comes with an admin user with the following credentials:
- Username: admin
- Password: admin

## User Types

There are different types of users in the system:

- **Type 0 (Pending)**: Users who have registered but their account has not been validated yet.
- **Type Banned**: Users who have the same rights as Type 0 users but have been rejected by an admin.
- **Type User**: Users who have been authorized by an admin. They have access to other users' profiles and to the public forum.
- **Type Admin**: Admin users who can grant or revoke permissions from other users, access both public and private forums.

These user types are used to manage access and permissions within the application.

## Pages

- **/**: The main page where users can log in or view topics.
- **/SignUp**: Page for new users to create an account. 
- **/Profil/:pseudo**: User profile page, where :pseudo represents the username of a user, accessible by clicking on a user's username. 
- **/Messages/:id**: Page to view and respond to messages within a topic. Where :id represents the id of a topic, accessible by clicking on a TOPIC. 
- **/Request**: This page is only accessible to admins. Here, admins can view all users who have registered and are awaiting validation to access the messages.
- **/gestionUsers**: Page for admin users to manage other users. Here, admins can change the permissions of other users.

## API Routes

The application exposes the following API routes:

- `GET /api/messages`: Retrieves the list of messages.
- `POST /api/message`: Creates a new message.
- `DELETE /api/message/:id`: Deletes a message by its ID.
- `GET /api/session`: Checks the user's session status.
- `POST /api/user/login`: Logs in the user.
- `GET /api/user/logout`: Logs out the user.
- `GET /api/users`: Retrieves the list of users.
- `POST /api/user`: Creates a new user.
- `POST /api/changeType`: Changes the user's type.

POST requests require a JSON body containing the required data.

## Authors

This project was created by Sadji Sid-Ahmed and Lim Oudam-dara as part of a university project.

