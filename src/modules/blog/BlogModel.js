import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const Schema=mongoose.Schema;

const timeStamps={timeStamps:true}
const blogSchema=new Schema({
    title:{type:String,required:true},
    description:{type:String},
    published_date:{type:Date,default:new Date()},
    modify_date:{type:Date,default:new Date()},
    status:{type:String,required:true,enum:["publish","unpublish"]},
    category:{type:String,required:true,enum:["sport","news","daily"]},
    author:{type:Schema.Types.ObjectId,ref:'User'},
    //author:{type:String},
    isDeleted:{type:Boolean,default:false}
},timeStamps);
blogSchema.plugin(mongoosePaginate);
export const BlogSchema= blogSchema;
