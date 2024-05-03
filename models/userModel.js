import mongoose from "mongoose";
import validator from 'validator'
import bcrypt from 'bcrypt'


const user = mongoose.Schema({
    name : {
        required : [true , "the name is required "],
        type : String,
    },
    email : {
        required : [true , "the email is required "],
        type : String,
        unique: true,
        validate : [validator.isEmail , "enter a valid email"]
    },
    password : {
        type : String,
        required : [true , "the password is required "],
        select : false
    },
    confirmPassword : {
        type : String,
        required : [true , "the password is required "],
        validator : function (ele){
            return ele === this.password
        }


    }
})

user.pre("save" , async function (  next ){
    if(!this.isModified("password")) return next();
    this.password =  await bcrypt.hash(this.password , 12)
    this.confirmPassword = undefined
    next()

})

user.methods.correctPass = async function(incomingPassword , userPassword){
    return await bcrypt.compare(incomingPassword , userPassword)
}

export const User = mongoose.model("user" , user)