Project README


Stack Used
MongoDB: NoSQL database for storing data.
ExpressJS: Web application framework for Node.js.
ReactJS: JavaScript library for building user interfaces.
NodeJS: JavaScript runtime for server-side development.


Security
JWT Token: Used for authentication and secure communication.
Google OAuth: Allows users to sign in using their Google accounts.


API Endpoints
Create Note {POST}: /api/notes

Get Notes of Authenticated User {GET}: /api/notes/:user_id
(Utilizes a UserContext in React to fetch user info based on the JWT cookie)

Get Details of Specific Note {GET}: /api/note/:id

Update Note {PATCH}: /api/note/:id

(PATCH is used instead of PUT for partial updates)



Running the Project
Frontend:
Navigate to the frontend directory and run the development server.
Backend:

I already include .env with necessary environment variables.
Navigate to the backend directory and run the server.
Both frontend and backend should be run in development mode to see the application in action.
