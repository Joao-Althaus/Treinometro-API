import {Request, Response} from "express"
import { AppDataSource } from "../config/data-source"
import Treino from "../entities/Treino";

const serieTreino = ()=> AppDataSource.getRepository(Treino);

export class TreinoController{

    // Todo
    // static async create(req:Request, res:Response){
        
    // }

    // static async update(req:Request, res:Response){
        
    // }

    // static async addSerie(req:Request, res:Response){

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

