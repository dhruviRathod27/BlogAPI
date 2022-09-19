import mongoose, { Model } from 'mongoose'
import { BlogSchema } from './BlogModel.js'

import {Query} from '../../utils/query.js'
import { UserSchema } from '../User/UserModel.js';
const query=new Query();
const BlogModel=mongoose.model("Blog",BlogSchema);
const UserModel=mongoose.model("User",UserSchema);
export class BlogService extends Query{
    addBlog=async(reqdata)=>{
        try{
            const blogData=await query.save(BlogModel,reqdata);
            console.log(blogData)
            return blogData; 
        }
        catch(err){
            console.log(err)
            return err;
        }
    }
    getBlogById=async(reqdata)=>{
        try{
            const blogDetail=await query.find(BlogModel,reqdata,'',{});
            return blogDetail;
        }catch(err){
            console.log(err)
        }
    }
    updateBlog=async(reqdata,updateData)=>{
        try{
            const blogData=await query.updateOne(BlogModel,reqdata,updateData);
            console.log(blogData)
            return blogData; 
        }
        catch(err){
            console.log(err)
            return err;
        }
    }
    deleteBlog=async(reqdata)=>{
        try{
            console.log(reqdata)
            const deletedData=await query.updateOne(BlogModel,reqdata,
                {isDeleted:true,
                modify_date:new Date()
                });
            console.log(deletedData)
            return deletedData; 
        }
        catch(err){
            console.log(err)
            return err;
        }
    }
    getBlogList=async(reqdata)=>{
        try{
            console.log(reqdata)
            const userdetail=await query.find(UserModel,{_id:reqdata.author});
            console.log("userdetail in blog list")
            console.log(userdetail)
            let blogList;
            if(userdetail.length==0){
                console.log("no user found");
                 return []
            }
            else if(userdetail[0].role=="Admin"){
                blogList=await query.find(BlogModel,{},'',{})
            }
            else{
                blogList=await query.find(BlogModel,reqdata,'',{})
            }
            console.log(blogList)
            return blogList;
        }
        catch(err){
            console.log(err)
        }
    }
   
}