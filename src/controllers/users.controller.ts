import {Request, Response} from 'express';
import {connection} from "../connection";
import {getRepository} from "typeorm";
import User from "../entity/User";


export class UsersController {    
    constructor() {
    }

    public getAllUsers(req: Request, res: Response) {
        console.log("req.query.id:",req.query);

        let filter = {};
        if(Object.keys(req.query).length > 0) {
            let queries = req.query;
            for (var key in queries) {
                if (queries.hasOwnProperty(key)) {
                    if(queries[key]) {
                        filter[key] = queries[key];
                    }
                }
            }                  
        }
        
        connection
            .then(async connection => {
                const users: User[] = await connection.manager.find(User,{where:filter});
                res.json({success:true, message:"data get done.", data:users});
            })
            .catch(error => {
                console.error("Error ", error);
                res.json({success:false, message:error.message});
            });
    }

    public addUser(req: Request, res: Response) {
        connection
            .then(async connection => {
                if(Object.keys(req.body).length == 0) {
                   return res.json({error: "Param required."})
                }                
                let setUser = getRepository(User).create(req.body);
                let newUser = await getRepository(User).save(setUser);
                
                res.json({success:true, message:"Successfully Saved."});
            })
            .catch(error => {
                console.error("Error ", error);
                res.json({success:false, message:error.message});
            });
    }
    public updateUser(req: Request, res: Response) {
        connection
            .then(async connection => { 
                
                let filter = {};
                let filterQuery = [];
                
                if(Object.keys(req.query).length > 0) {
                    let queries = req.query;
                    for (var key in queries) {
                        if (queries.hasOwnProperty(key)) {
                            if(queries[key]) {
                                filter[key] = queries[key];
                                filterQuery.push(`${key} = :${key}`);
                            }
                        }
                    }                  
                }
                else {
                    return res.json({success:false, message: "query parameter required!"})
                }
                let whereQuery = filterQuery.length > 0  ? filterQuery.join(" AND ") : '';

                let {name, phoneNumber, city} = req.body;                

                let setUpdate = req.body;
                 
                await getRepository(User).createQueryBuilder("user")
                .update()
                .set(setUpdate)
                .where(whereQuery, filter)
                .execute();                

                res.json({success:true, message: "Successfully Updated."})
            })
            .catch(error => {
                console.error("Error ", error);
                res.json({success:false, message:error.message});
            });
    }
    public getUserById(req: Request, res: Response) {
        connection
            .then(async connection => {
                let user  = await connection.manager.findOne(User, req.params.userId);
                res.json({success:true, message: "Successfully get.", data:user})
            })
            .catch(error => {
                console.error("Error ", error);
                res.json({success:false, message:error.message});
            });
    }
    public deleteUser(req: Request, res: Response) {
        connection
            .then(async connection => {  
                
                let filter = {};
                let filterQuery = [];
                
                if(Object.keys(req.query).length > 0) {
                    let queries = req.query;
                    for (var key in queries) {
                        if (queries.hasOwnProperty(key)) {
                            if(queries[key]) {
                                filter[key] = queries[key];
                                filterQuery.push(`${key} = :${key}`);
                            }
                        }
                    }                  
                }
                else {
                    return res.json({ success:false, message: "query parameter required!"})
                }

                let whereQuery = filterQuery.length > 0  ? filterQuery.join(" AND ") : '';

                await getRepository(User).createQueryBuilder("user")
                .delete()
                .where(whereQuery, filter)
                .execute();    

                res.json({ success:true, message: "Successfully Removed."})
            })
            .catch(error => {
                console.error("Error ", error);
                res.json({ success:true, message:error.message});
            });
    }
}
