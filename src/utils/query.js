import { model, Model } from "mongoose";

export class Query{
    save=async(Model,data)=>{
        try{
            return new Promise((resolve,reject)=>{
                console.log("Query==>save start")
                // new Model(data).save((err,data)=>{
                //     if(err){
                //     console.log('query=>save=>model.save',err)

                //         return reject(err);
                //     }
                //     console.log("query=>save",data);
                //     return resolve(data);
                // })
                new Model(data).save(data).then((resultData)=>{
                    return resolve(resultData)
                }).catch((err)=>{
                    return reject(err)
                })
            })
        }
        catch(err){
            console.log('query=>save=>catch-error')
        }
    };
    find=async(Model,filter,projection='',sort={})=>{
        try{
            return new Promise((resolve,reject)=>{
                Model.find(filter,projection).sort(sort).lean().then((resultData)=>{
                    return resolve(resultData);
                })
                .catch((err)=>{
                    return reject(err)
                })
            })
        }
        catch(err){
            console.log(err);
            return err;
        }
    }
    updateOne=async(Model,filter,uodatedData)=>{
        try{
            return new Promise((resolve,reject)=>{
                return Model.updateOne(filter,uodatedData).then((resultData)=>{
                    return resolve(resultData);
                }).catch(err=>{
                    return reject(err);
                })    
            })
        }
        catch(err){
            return err;
        }
    }
    delete=async(Model,filter)=>{
        try{
             return new Promise((resolve,reject)=>{
                return Model.delete(filter).then((resultData)=>{
                    return resolve(resultData)
                }).catch(err=>{
                    return reject(err)
                })
             })
        }
        catch(err){
            console.log(err)
            return err;
        }
    }
    count=async(Model,filter)=>{
        try{
            return new Promise((resolve,reject)=>{
                resolve( Model.countDocument(filter))
            })
        }
        catch(err){
            return err;
        }
    }
}