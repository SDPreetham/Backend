const {UserModal,BookModal} = require("../modals");

exports.getAllUsers = async (req,res)=>{
   
    const users = await UserModal.find();

if(users.length === 0){
    res.status(404).json({
        success:false,
        message:"No users found"
    })
}

    res.status(200).json({
        success:true,
        data:users,
    });
}
exports.getSingleUserbyId = async (req,res)=>{
    const {id} = req.params;
    

    const user = await UserModal.findById(id);
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
}
exports.deleteUser = async (req,res)=>{
    const {id} = req.params;
    const user = await UserModal.deleteOne ({
        _id:id,
    })

    if(!user)
        return res.status(404).json({
            success:false,
            message:"User not found"
        });

        //const allUsers = await UserModal.find();
        
        return res.status(200).json({
            success:true,
            message:"Deleted user successfully"
        });
    
}