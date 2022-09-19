import { UserService } from "./UserService.js";
import _ from 'lodash'
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userService=new UserService();
export class UserController{
    addUser=async(req,res)=>{
        try{
            const userDetail=await userService.getUserByIdOrEmail({
                email:req.body.email,
                _id:{$ne:req.params.userId},
                isDeleted:false})
                if(!_.isEmpty(userDetail)){
                    return res.json({statusCode:409,userDetail,errorMessage:"User already exists with this email"})
                }
            const userData=userService.registerUser(req.body);
            console.log('userdata')
            console.log(userData)
            if(_.isError(userData)) {
               console.log('error occurered')
               console.log(userData)
               return res.json({statusCode:400,message:'user creation error',userData})
            }
            return res.json({statusCode:200,message:'user created successfully',userData});
        }
        catch(err){
            console.log(err)
            res.json({statusCode:400,errorMessage:err})
        }
    }
   
    getUserList=async(req,res)=>{
        try{
            const userList=await userService.getUserList(req);
         
            if(_.isError(userList) || _.isEmpty(userList)){
                return res.json( {statusCode:400,userList,errorMessage: "error via fetching a user list"});
            }
            return res.json( {statusCode:200,userList,Message: "fetched user-list successfully"});
        }   
        catch(err){
            return res.json( {statusCode:400,errorMessage: err});
        }
       
    }
    getUserById=async(req,res)=>{
        try{
            const userDetail=await userService.getUserByIdOrEmail({_id:req.params.userId});
         
            if(_.isError(userDetail) || _.isEmpty(userDetail)){
                return res.json( {statusCode:400,userDetail,errorMessage: "error via fetching a user"});
            }
            return res.json( {statusCode:200,userDetail,Message: "fetched user successfully"});
        }   
        catch(err){
            return res.json( {statusCode:400,errorMessage: err});
        }
    }
    login =async (req, res) =>{
       try{
        const userDetail=await userService.getUserByIdOrEmail({email:req.body.email})
        if(_.isError(userDetail) || _.isEmpty(userDetail)){
            console.log(userDetail)
            return res.json( {statusCode:400,userDetail,errorMessage: "error via fetching a user"});
        }
       let bool=bcrypt.compareSync(req.body.password,userDetail[0].password);
       if (!bool) {
            return res.status(401).json({statusCode:401, errorMessage: 'Authentication failed. Invalid user or password'});
          }
          return res.json({ token: jwt.sign({ email: userDetail.email, password: userDetail.password, _id: userDetail._id }, 'SecreteKeyForBlogManagement') });
       }
       catch(err){
        console.log(err)
        return res.json( {statusCode:400,errorMessage: err});
       }
      };
      loginRequired = function(req, res, next) {
        if (req.user) {
          next();
        } else {
      
          return res.status(401).json({ message: 'Unauthorized user!!' });
        }
      };
      profile = function(req, res, next) {
        if (req.user) {
          res.send(req.user);
          next();
        } 
        else {
         return res.status(401).json({ message: 'Invalid token' });
        }
      };
}