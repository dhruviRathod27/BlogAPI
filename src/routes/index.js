import { BlogRoutes } from '../modules/blog/BlogRoute.js';
import {UserRoutes} from "../modules/User/UserRoute.js";
export class Routes {
 blogRoutes = new BlogRoutes();
 userRoutes=new UserRoutes();

  // * Home route
   routes(app) {
    app.route('/').get((req, res) => {
      res.status(200).send({
        message: 'Welcome to the API',
      });
    });

    this.blogRoutes.blogRoutes(app)
    this.userRoutes.userRoutes(app)
  }
}
