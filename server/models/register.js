const mongoose = require ("mongoose");

const registerSchema = new mongoose.Schema({
    companyname:{
        type:String,
        required:true
    },
    ownername:{
        type:String,
        required:true   
    },
    rollno:{
        type:Number,
        required:true
    },
    owneremail:{
        type:String,
        required:true

    },
    accesscode:{
        type:String,
        default:"GEVSsY",
        required:true
    },clientID:{
        type:String,
        required:true
    },
    clientSecret:{
        type:String,
        required:true
    }

})

const register = mongoose.model("register",registerSchema);
module.exports=register;