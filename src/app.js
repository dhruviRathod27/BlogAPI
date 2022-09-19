import express from  "express";
import bodyParser from "body-parser";
import { Routes } from "./routes/index.js" ;
import 'dotenv/config';
import mongoose from'mongoose';

class App {
    app;
    allRoutes = new Routes();
    constructor () {
        this.app = express();
        this.config();
        this.setupMongoDB()
        this.allRoutes.routes(this.app);
    }

    config(){
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        })
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(function(req, res, next) {
            if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
              jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'SecreteKeyForBlogManagement', function(err, decode) {
                if (err) req.user = undefined;
                req.user = decode;
                next();
              });
            } else {
              req.user = undefined;
              next();
            }
          });
    }

     async setupMongoDB() {
        try{
            await mongoose.connect('mongodb://localhost:27017/blogManagement')
            console.log('connected to mongoDB -> blogManagement');
            
        } catch (error) {
            console.log('+-------------------------------------------------------------+');
            console.log("# Error while connecting to MongoDB");
            console.log(process.env.MONGO_URL)
            console.log(error);
            
        }
    }
}

export default new App().app;