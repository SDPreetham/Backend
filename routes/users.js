const express = require("express");
const {users} = require("../data/users.json");
const { UserModal, BookModal } = require("../modals");
const { getAllUsers, deleteUser } = require("../controllers/user_controller");
const { getSingleBooksbyId } = require("../controllers/book_controller");
const {getSingleUserbyId} = require("../controllers/user_controller");



const router = express.Router();


/*router.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        data:users,
    });
});*/
router.get("/",getAllUsers)





/*router.get("/:id",(req,res)=>{
    const {id} = req.params;
    const user = users.find((each)=>each.id===id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found",
        });
    }
    return res.status(200).json({
        success:true,
        message:"User found",
        data:user,
    });
});*/
router.get(":/id", getSingleUserbyId)

/** 
 * Route: /users
 * Method:POST
 * Description: Create a new user
 * Access:Public
 * Parameters: id
 */

router.post("/",(req,res)=>{
    const {id, name, surname, email, subscriptionType, subscriptionDate}= req.body;
const user = users.find((each)=>each.id===id);
if(user){
    return res.status(404).json({
        success:false,
        message:"User already exists"
    });
}
users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
});
return res.status(201).json({
    success:true,
    data:users,
})
});

/** 
 * Route: /users:id
 * Method:PUT
 * Description: Updating user by ID
 * Access:Public
 * Parameters: id
 */

router.put('/:id',(req,res)=>{
    const {id} = req.params;
    const {data} = req.body;
     const user = users.find((each)=>each.id===id);

     if(!user)
     return res.status(404).json({
    success:false,
    message:"User not found"
    });

const updateUser = users.map((each)=>{
    if(each.id===id){
        return{
            ...each,
            ...data,
        }
    }
    return each;
})
return res.status(200).json({
    success:true,
    data:updateUser
})
})

/** 
 * Route: /users:id
 * Method:DELETE
 * Description: Delete user by ID
 * Access:Public
 * Parameters: id
 */

/*router.delete('/:id',(req,res)=>{
    const {id} = req.params;
    const user = users.find((each)=>each.id===id);

    if(!user)
        return res.status(404).json({
            success:false,
            message:"User not found"
        });
        const index = users.indexof(user);
        users.splice(index,1);

        return res.status(200).json({
            success:true,
            data:users
        });
    
})*/

router.delete('/:id', deleteUser);


/** 
 * Route: /users/subscription-details/:id
 * Method:GET
 * Description: Get all user subscription details by ID
 * Access:Public
 * Parameters: ID

 */

router.get('/subscription-details/:id', (req,res)=>{
    const {id} =req.params;
    const user = users.find((each)=>each.id===id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"No user with this ID"
        });
    }

    const getdateinDays = (data="") =>{
     let date;
     if(date===""){
        //current date
        date = new Date();
     }
     else {
        //Getting date on basis of data variable
        date = new Date(data);
     }
let days = Math.floor(data / (1000*60*60*24));
return days;
    };
    const subscriptionType =(date) => {
if(user.subscriptionType=== "Basic"){
date=date+90;
}
else if(user.subscriptionType=== "Standard"){
date=date+180;
}
else if(user.subscriptionType=== "Premium"){
date=date+365;
}
return date;
    };


//Jan 1, 1970 UTC //Milliseconds
    //Subscription Expiration Calculation
let returnDate = getdateinDays(user.returnDate);
let currDate = getdateinDays();
let subsDate = getdateinDays(user.subscriptionDate);
let subsExpiry = subscriptionType(subsDate);

const data = {
    ...user,
    subscriptionExpired:subsExpiry<currDate,
    daysLeft : subsExpiry <=currDate?0: subsDate-currDate,
    fine: returnDate < currDate ?subsExpiry <= currDate ?200 : 100 : 0,
}
res.status(200).json({
    success:true,
    data:data,
})
})

module.exports=router;