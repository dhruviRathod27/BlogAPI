import {mongoose } from "mongoose"
import bcrypt from "bcrypt"

const Schema=mongoose.Schema;
const timeStamps ={timeStamps:true};
const userSchema=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    dob:{type:Date},
    role:{type:String,required:true,
        enum: [
        "Admin",
        "User",
      ]}
},timeStamps )

userSchema.methods.comparePassword=function(pass){
    return bcrypt.compareSync(pass,this.password)
}
export const UserSchema=userSchema;

