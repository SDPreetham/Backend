const {BookModal, UserModal} = require("../modals");
//DTO
const IssuedBook = require("../dto/book-dto");

exports.getAllBooks = async  (req,res) => {
    const books = await BookModal.find();

    if(books.length===0){
        return res.status(404).json({
success:false,
message:"No Books found",
        })
    }
    return res.status(200).json({
        success:true,
        data:books,
    })
}

/** 
 * Route: /books/:id
 * Method:GET
 * Description: Get books by ID
 * Access:Public
 * Parameters: ID
 */

 
exports.getSingleBooksbyId =  async (req,res) => {
    const {id} = req.params;
   // const book = books.find((each)=>each.id===id);
const book = await BookModal.findById(id);
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

}

exports.getAllIssuedBooks = async (req,res)=>{
    
    const users = await UserModal.find({

        issuedBook : {$exists: true},
    }).populate("issuedBook");

    const issuedBooks = users.map((each)=> new IssuedBook(each) );
        
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
    }

    exports.addNewBook = async (req,res)=>{
        const {data} = req.body;
        //Info check
        if(!data){
            res.status(400).json({
                success:false,
                message:"No data provided"
            })
        }
        
        //ID Check
       // const book = books.find((each)=>each.id===data.id)
       await BookModal.create(data);

       const allBooks = await BookModal.find();
        if(book){
            return res.status(404).json({
                success:false,
                message:"Book with the given ID already exists"
            })
        }
        
        
       // const allBooks = [...books,data];
        return res.status(200).json({
            success:true,
            data:allBooks
        })
        }

        exports.updateBookById = async (req,res)=>{
            const {id} = req.params;
            const {data} = req.body;
        
            const updateBook = await BookModal.findOneAndUpdate({
                _id:id,
            },data,{
                new:true,
            })
        
            if(!book){
                return res.status(404).json({
                    success:false,
                    message:"Book with the given ID does not exist"
                })
            }
           /*const updateBook = books.map((each)=>{
                if(each.id===id){
                    return{
                        ...each,
                        ...data,
                    }
                }
                return each;
            })*/
            return res.status(201).json({
                success:true,
                data:updateBook
            })
        }
