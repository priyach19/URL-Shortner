const mongoose=require('mongoose');
const dotenv = require('dotenv').config()

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connected to database");
    }catch(err){
        console.log("mongodb database error",err)

    }
}
module.exports=connectDB;