const mongoose=require("mongoose")
const {Schema} = mongoose;
const userSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    links: [
        {
            ref: 'Link',
            type: mongoose.Types.ObjectId
        }
    ]
})

const User=mongoose.model("user",userSchema)
module.exports=User;