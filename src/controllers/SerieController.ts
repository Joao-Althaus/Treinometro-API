import {Request, Response} from "express"
import { AppDataSource } from "../config/data-source"
import Serie from "../entities/Serie";

const serieRepo = ()=> AppDataSource.getRepository(Serie);

export class SerieController{

     // Todo
    // static async create(req:Request, res:Response){
        
    // }

    // static async update(req:Request, res:Response){
        
    // }

    // static async remove(req:Request, res:Response){
        
    // }

    // static async getById(req:Request, res:Response){
        
    // }

    // static async getByUser(req:Request, res:Response){
        
    // }

    // static async getAll(req:Request, res:Response){
        
    // }
}