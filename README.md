TODO API
Local Development server used:
http://localhost:8080/

ADD USER
POST /api/user/
Example values 
{
    "name":"Jurrasic park",
    "email":"park@gmail.com",
    "password":"password"
}

LOGIN
POST /api/user/login/
Example values 
{
    "email":"park@gmail.com",
    "password":"password"
}

GET NOTES
GET /api/note/


ADD NOTE
POST /api/note/
Example values 
{
  "content":"Jurrasic note",
  "onDate":"12-28-2021",
  "status":"complete"    
}


UPDATE NOTE 
PUT /api/note/id/:id
Example values 
{
  "status": "incomplete",
  "onDate":"12-28-2021"
}

DELETE NOTE
DELETE /api/note/id/:id