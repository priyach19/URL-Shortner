const mongoose=require('mongoose');
const mongoURI="mongodb+srv://intern:intern@cluster0.gfhkf5y.mongodb.net/Intern?retryWrites=true&w=majority"
// mongoose.connect(mongoURI)
const connectDB=async()=>{
    try{
        await mongoose.connect(mongoURI)
        console.log("connected to database");
    }catch(err){
        console.log("mongodb database error",err)

    }
}
module.exports=connectDB;