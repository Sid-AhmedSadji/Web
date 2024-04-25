# Web Forum App

This application is a web forum where users can create topics and respond to them. Users have limited access to the site and cannot access messages until they have been authorized by an admin.

## Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **React.js**: JavaScript library for building user interfaces
- **MongoDB**: NoSQL database
- **Express Session**: Middleware for session management in Express.js

These technologies are used specifically for handling database queries.

Additionally, some elements of the frontend are sourced from open-source projects.

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

## Pages

- **Home**: The main page where users can log in or sign up. [Go to Home](http://localhost:5173/)
- **Sign Up**: Page for new users to create an account. [Go to Sign Up](http://localhost:5173/SignUp)
- **Profile**: User profile page, accessible by clicking on a user's username. [Go to Profile](http://localhost:5173/Profil/:login)
- **Message Page**: Page to view and respond to messages within a topic. [Go to Message Page](http://localhost:5173/Messages/:id)
- **Request**: Page where users can request access to view messages. [Go to Request](http://localhost:5173/Request)
- **User Management**: Page for admin users to manage other users. [Go to User Management](http://localhost:5173/gestionUsers)

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
