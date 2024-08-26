STACK USED
#MongoDB
#ExpressJS
#ReactJS
#NodeJS

SECURITY USED
#JWT TOKEN
#Google OAuth

#API_Endpoints
create note {POST} =  /api/notes
get  notes of authenticated use {GET} = /api/notes/:user_id  , I create a UserContext on react to get the user info based on the cookie sent from jwt
get details of specifi note {GET} = /api/note/:id
update note {PATCH} = /api/note/:id   , I used patch on this, I forgot to use PUT


This website is running, just run on development both frontend and backend
I also included .env of both files
