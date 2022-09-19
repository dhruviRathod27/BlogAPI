import mongoose, { Model } from 'mongoose'
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserSchema } from './UserModel.js'

import {Query} from '../../utils/query.js'
const query=new Query();
const UserModel=mongoose.model("User",UserSchema);
export class UserService extends Query{
    registerUser=async(reqdata)=>{
        try{
            const newUser=new UserModel(reqdata);
            newUser.password=bcrypt.hashSync(reqdata.password,10);
            const userData=await query.save(UserModel,newUser);
            console.log(userData)
            userData.password=undefined;
            return userData; 
        }
        catch(err){
            console.log(err)
            return err;
        }
    }
    login = async(reqdata)=> {
        try{
            const userDetail=await query.find(UserModel,reqdata,'',{});
            return userDetail;
        }
        catch(err){
            console.log(err)
            return err;
        }
      };

    getUserByIdOrEmail=async(reqdata)=>{
        try{
            const userDetail=await query.find(UserModel,reqdata,'',{});
            console.log(reqdata)
            console.log(userDetail)
            return userDetail;
        }catch(err){
            console.log(err)
        }
    }
    getUserList=async(reqdata)=>{
        try{
            const userList=await query.find(UserModel,reqdata,'',{})
            console.log(userList)
            return userList;
        }
        catch(err){
            console.log(err)
        }
    }

}