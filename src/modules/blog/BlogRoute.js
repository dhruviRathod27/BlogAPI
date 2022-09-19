import { BlogController } from "./BlogController.js";
import { BlogValidator } from "./BlogValidator.js";
const blogController=new BlogController()
const blogValidator=new BlogValidator()
export class BlogRoutes{
    blogRoutes(app){
        app.route('/api/blog').post(blogValidator.addBlog,blogController.addBlog)
        app.route('/api/blogs/:authorId').get(blogController.getBlogList)
        app.route('/api/blog/:blogId')
        .get(blogController.getBlogById)
        .put(blogValidator.addBlog,blogController.updateBlog)
        .delete(blogController.deleteBlog)
    }
}