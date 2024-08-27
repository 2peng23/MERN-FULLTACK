Project README


Stack Used
MongoDB database for storing data.
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
Frontend: port must be 5173 set on cors
Navigate to the frontend directory and run the development server.


Backend: port must 5555 set on cors
I already include .env with necessary environment variables.
Navigate to the backend directory and run the server.
Both frontend and backend should be run in development mode to see the application in action.


And lastly, to manually create an admin user this is the endpoint

/api/user/create  {POST}
body request should be
name
email
password
role: 1 //must be one because new registered user default is 0 and that's how I filter admin/client

