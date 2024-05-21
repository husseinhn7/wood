import mongoose from "mongoose";
import validator from 'validator'
import bcrypt from 'bcrypt'
import crypto from 'crypto'


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
    },
    role : {
        type : String,
        enum : ["admin", "user", "moderator" ]
    },

    passwordChangedAt : Date,
    passwordRestToken : String,
    PasswordRestExpires : Date

})

user.pre("save" , async function (  next ){
    if(!this.isModified("password")) return next();
    this.password =  await bcrypt.hash(this.password , 12)
    this.confirmPassword = undefined
    next()
})

user.pre("save" , async function( next ) {
    if(!this.isModified("password") || this.isNew ) return next();

    this.passwordChangedAt = Date.now() - 1000 ; 
    next()
})

user.methods.correctPass = async function(incomingPassword , userPassword){
    return await bcrypt.compare(incomingPassword , userPassword)
}

user.methods.passwordChangedAfter = async function(JWTDate){
    if (this.passwordChangedAt){
        const date = parseInt(this.passwordChangedAt.getTime() / 1000, 10 )
      

        return date < JWTDate
    }
    return false
}



user.methods.passwordRestTokenFun = function(){
    const restToken = crypto.randomBytes(32).toString("hex")

    this.passwordRestToken = crypto.createHash("sha256").update(restToken).digest("hex")

    this.PasswordRestExpires = Date.now() + 10 * 60 * 1000
     

    return restToken
}




export const User = mongoose.model("user" , user)