const express = require ("express")
const Register = require ("../models/register")
const jwt = require ("jsonwebtoken");
const {registerUser} =require("../controllers/registerController")
const router =express.Router();
const dotenv = require ("dotenv");


dotenv.config();


router.post("/", registerUser);
router.post("/test/register",async (req,res)=>{
    console.log("Request Body:", req.body); 
    const{companyname,ownername,rollno,owneremail,accesscode}=req.body;
    if(!companyname||!ownername||!rollno||!owneremail||!accesscode){
        return res.status(400).json({message:"All Fields are required"})
    }
   
    try{
        const newRegister =new Register (companyname,ownername,rollno,owneremail,accesscode);
        const savedRegister = await newRegister.save();
        return res.status(200).json(savedRegister)
    }
    catch(error){
        console.error("Error Saving to MongoDB:", error);
        return res.status(500).json({messgae:"Internal Server Error"})
    }
     
})
router.post("/test/auth",async (req,res)=>{
  
    const{companyname,ownername,rollno,owneremail,accesscode}=req.body;
    if(!companyname||!ownername||!rollno||!owneremail||!accesscode){
        return res.status(400).json({message:"All Fields are required"})
    }
    try{
        const newRegister =new Register (companyname,ownername,rollno,owneremail,accesscode);
        const savedRegister = await newRegister.save();
        
        const token=jwt.sign(
            {id:savedRegister._id,companyname:savedRegister.companyname},
            process.env.JWT_SECRET,
            {expiresIn:"24h"}
        )
        return res.status(200).json({
            token_type:"Bearer",
            access_token:token,
            expires_in:4500
        })
       
    }
    catch(error){
        return res.status(500).json({messgae:"Internal Server Error"})
    }
     
})



module.exports = router;

