# Backend
## BOOK RECORD MANAGEMENT
Server -> Storing the book data, user register, subscribers

# Routes and endpoints
## /users
POST: Create a new user
GET: Get all user lists

## /users/{id}
GET: Get a user by ID
PUT: Update info by ID
DELETE: Delete a user by ID (Check if the person still retains any books and has any fines dued)

Fine - 1)Missing Subscription renewal
2) Missing Book Renewal

 user => 3 months || 6 months || 12 months

## users/subscription-details/{id}
 GET
 1)Date of subscription
 2)Valid till 
 3)Fine if any

 ## /books
 GET: Get all the books
 POST: Create/Add a book

 ## /books/{id}
 GET: Get a book by its ID
 PUT: Update a book by its ID

 ## books/issued
 GET: Get all the books issued

 ## /books/issued/withFine
 GET: Get all issued books with fine

 ## Subscription
 Basic - 3 months
 Standard - 6 months
 Premium - 12 months

 DB Connectivity
 mongodb+srv://preethamsd8:<db@devtown>@cluster0.vputryb.mongodb.net/?retryWrites=true&w=majority

 ## MVC Architecture
 Modal View Controller

 ## Data Transfer Object
 User:{
id:
name:
age:
 }

 DTO

 InheritedUser{

    id:
    name:
 }