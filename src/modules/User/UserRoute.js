import { UserController } from "./UserController.js";
import { UserValidator } from "./UserValidator.js";
const userController=new UserController()
const userValidator=new UserValidator()
export class UserRoutes{
    userRoutes(app){
        app.route('/auth/register').post(userValidator.register,userController.addUser)
        app.route('/auth/login').post(userValidator.login,userController.login)
        app.route('/api/users').get(userController.getUserList)
        app.route('/api/user/:userId')
        .get(userController.getUserById)

    }
}