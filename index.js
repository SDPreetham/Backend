const express = require("express");
const app = express();
const port = 8081;
app.use(express.json());
app.get("/",(req,res)=>{
    res.status(200).json({
message:"Server is up and running successfully",
    });
});

app.listen(port,()=>{
    console.log(`Server is working at PORT ${port}`);
})