import { BlogService } from "./BlogService.js";
import _ from 'lodash'
import { BlogValidator } from "./BlogValidator.js";

const blogService=new BlogService();
const blogValidator=new BlogValidator();
export class BlogController{
    addBlog=async(req,res)=>{
        try{
            const blogDetail=await blogService.getBlogById({
                title:req.body.title,
                _id:{$ne:req.params.blogId},
                isDeleted:false});
                if(!_.isEmpty(blogDetail)){
                    return res.json({statusCode:409,blogDetail,errorMessage:"Blog already exists with this title"})
                }
            const blogData=blogService.addBlog(req.body);
            console.log('blogdata')
            console.log(blogData)
            if(_.isError(blogData)) {
               console.log('error occurered')
               console.log(blogData)
               return res.json({statusCode:400,message:'blog creation error',blogData})
            }
            return res.json({statusCode:200,message:'blog created successfully',blogData});
        }
        catch(err){
            console.log(err)
            res.json({statusCode:400,errorMessage:err})
        }
    }
    updateBlog=async(req,res)=>{
        try{
            const blogDetail=await blogService.getBlogById({
                title:req.body.title,
                _id:{$ne:req.params.blogId},
                isDeleted:false})
                if(!_.isEmpty(blogDetail)){
                    return res.json({statusCode:409,blogDetail,errorMessage:"Blog already exists with this title"})
                }

            const blogData=blogService.updateBlog(
                {
                    _id:req.params.blogId,
                    isDeleted:false
                },req.body);
           
            if(_.isError(blogData)) {
               console.log('error occurered')
               return res.json({statusCode:400,message:'blog updated error',blogData});
            }
            console.log('blogdata')
            console.log(blogData)
            res.status(200);
            return res.json({statusCode:200,message:'blog updated successfully',blogData});
        }
        catch(err){
            console.log(err)
            res.json({statusCode:400,errorMessage:err})
        }
    }
    deleteBlog=async(req,res)=>{
        try{
            const blogdata=await blogService.deleteBlog({_id:req.params.blogId})
            if(_.isError(blogdata) || _.isEmpty(blogdata)){
                return res.json( {statusCode:400,blogdata,errorMessage: "Blog deletion error"});
            }
            else if (blogdata.modifiedCount <= 0){
                return res.json( {statusCode:400,blogdata,errorMessage: "Blog deletion error"});
            }
            return res.json({statusCode:200,message:'blog deleted successfully',blogdata});
        }
        catch(err){
            console.log(err);
            return res.json( {statusCode:400,errorMessage: err});
        }
    }
    getBlogList=async(req,res)=>{
        try{
            console.log('inside list')
            console.log(req.params.authorId);
            const blogList=await blogService.getBlogList({author:req.params.authorId});
         
            if(_.isError(blogList)){
                return res.json( {statusCode:400,blogList,errorMessage: "error via fetching a blog list"});
            }
            else if(_.isEmpty(blogList)){
                return res.json({statusCode:200,blogList:[],message:"No blog found for author"})
            }
            return res.json( {statusCode:200,blogList,Message: "fetched blog-list successfully"});
        }   
        catch(err){
            return res.json( {statusCode:400,errorMessage: err});
        }
       
    }
    getBlogById=async(req,res)=>{
        try{
            const blogDetail=await blogService.getBlogById({_id:req.params.blogId});
         
            if(_.isError(blogDetail) || _.isEmpty(blogDetail)){
                return res.json( {statusCode:400,blogDetail,errorMessage: "error via fetching a blog"});
            }
            return res.json( {statusCode:200,blogDetail,Message: "fetched blog successfully"});
        }   
        catch(err){
            return res.json( {statusCode:400,errorMessage: err});
        }
    }
}