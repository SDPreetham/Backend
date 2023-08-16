const express = require("express");
const dotenv = require("dotenv");


//Importing routes
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

//Database Collection
const DbConnection = require("./dbConnection");
dotenv.config();

const app = express();
DbConnection();
const port = 8081;
app.use(express.json());
app.get("/",(req,res)=>{
    res.status(200).json({
message:"Server is up and running successfully",
    });
});

/**
 * 
 */
app.use("/users",usersRouter);
app.use("/books",booksRouter);






/** 
 * Route: /users/:id
 * Method: GET
 * Description: Get user by their ID
 * Access:Public
 * Parameters: id
 */







app.get("*",(req,res)=>{
    res.status(404).json({
        message:"This route does not exist",
    });
});

app.listen(port,()=>{
    console.log(`Server is working at PORT ${port}`);
});