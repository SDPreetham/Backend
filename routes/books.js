const express = require("express");

//Controllers
const {getAllBooks , getSingleBooksbyId, getAllIssuedBooks, addNewBook, updateBookById} = require("../controllers/book_controller");
//Data Import
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");


const {UserModal,BookModal} = require("../modals")


//Local Router
const router = express.Router();

/** 
 * Route: /books
 * Method:GET
 * Description: Get books 
 * Access:Public
 * Parameters: NONE
 */


/*router.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        data:books
    });
})*/

router.get("/",getAllBooks)

/** 
 * Route: /books/:id
 * Method:GET
 * Description: Get books by ID
 * Access:Public
 * Parameters: ID
 */

/*router.get("/:id",(req,res)=>{
    const {id} = req.params;
    const book = books.find((each)=>each.id===id);

    if(!book){
    return res.status(404).json({
        success:false,
        message:"Book does not exist"
    }) 
}
return res.status(200).json({
    success:true,
    data:book
})
})*/ 

//getSingleBooksbyId
router.get(":/id",getSingleBooksbyId);


/** 
 * Route: /books/issued/by-user
 * Method:GET
 * Description: Get all issued books
 * Access:Public
 * Parameters: none
 */
/*router.get("/issued/by-user",(req,res)=>{
    const UserIssuedBooks = users.filter((each)=>{
        if(each.issuedBook)
        return each;
    });

    const issuedBooks = [];

    UserIssuedBooks.forEach((each)=>{
        const book = books.find((book)=>book.id===each.issuedBook);

       book.issuedBy = each.name;
       book.issuedDate =each.issuedDate;
       book.returnDate = each.returnDate;


       //Pushing book info onto array
       issuedBooks.push(book);
    });
       if(issuedBooks.length === 0){
        return res.status(404).json({
            success:false,
            message:"No books issued"
        });
       }
       return res.status(200).json({
        success:true,
        data:issuedBooks
       })
    })*/

    router.get("/issued/by-user", getAllIssuedBooks);

/** 
 * Route: /books/issued/by-user
 * Method:POST
 * Description: Add a new book
 * Access:Public
 * Parameters: none
 * Data:author,name,Genre,Price,Publisher,ID
 */

/*router.post('/',(req,res)=>{
const {data} = req.body;
//Info check
if(!data){
    res.status(400).json({
        success:false,
        message:"No data provided"
    })
}

//ID Check
const book = books.find((each)=>each.id===data.id)
if(book){
    return res.status(404).json({
        success:false,
        message:"Book with the given ID already exists"
    })
}


const allBooks = [...books,data];
return res.status(200).json({
    success:true,
    data:allBooks
})
})*/
router.post("/",addNewBook);



/** 
 * Route: /books/:id
 * Method:PUT
 * Description: Update a book by its ID
 * Access:Public
 * Parameters: ID

 */
/*router.put("./id",(req,res)=>{
    const {id} = req.params;
    const {data} = req.body;

    const book = books.find((each)=>each.id===id);

    if(!book){
        return res.status(404).json({
            success:false,
            message:"Book with the given ID does not exist"
        })
    }
    const updateBook = books.map((each)=>{
        if(each.id===id){
            return{
                ...each,
                ...data,
            }
        }
        return each;
    })
    return res.status(201).json({
        success:true,
        data:updateBook
    })
})*/

router.put(":/id",updateBookById);

//Default export
module.exports = router;