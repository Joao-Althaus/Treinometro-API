import {Request, Response} from "express"
import { AppDataSource } from "../config/data-source"
import Treino from "../entities/Treino";
import Usuario from "../entities/Usuario";
import Exercicio from "../entities/Exercicio";
import Serie from "../entities/Serie";
import { Between } from "typeorm";

const treinoRepo = ()=> AppDataSource.getRepository(Treino);
const usuarioRepo = ()=> AppDataSource.getRepository(Usuario);
const serieRepo = ()=> AppDataSource.getRepository(Serie);
const exercicioRepo = ()=> AppDataSource.getRepository(Exercicio);

export class TreinoController{

    static async create(req:Request, res:Response){
        try{
            const usuario_id = Number(req.body.usuario_id);

            if(!usuario_id){
                return res.status(400).json({ message: "O campo usuario_id é obrigatório!" });
            }

            const usuario = await usuarioRepo().findOne({ where: {id: usuario_id}})

            if(!usuario){
                return res.status(404).json( {message: "Usuário não encontrado!"})
            }

            const treino = new Treino();
            treino.usuario = usuario;
            treino.series = [];

            const savedtreino = await treinoRepo().save(treino);

            return res.status(201).json({message : "Treino criado com sucesso!", treino: savedtreino})
        }catch(error : any){
            console.error(error);
            return res.status(500).json({ message: "Erro ao criar treino!" });
        }
    }

    static async addSerie(req:Request, res:Response){
        try {
            const treinoId = Number(req.params.id);
            const { exercicioId, carga, repeticoes } = req.body;

            const treino = await treinoRepo().findOne({ where: { id: treinoId } });
            if (!treino) {
                return res.status(404).json({ message: "Treino não encontrado!" });
            }

            const exercicio = await exercicioRepo().findOne({ where: { id: exercicioId } });
            if (!exercicio) {
                return res.status(404).json({ message: "Exercício não encontrado!" });
            }

            const serie = serieRepo().create({
                exercicio,
                treino,
                carga,
                repeticoes,
            });

            const savedSerie = await serieRepo().save(serie);

            return res.status(201).json({
                message: "Série adicionada ao treino com sucesso!",
                serie: savedSerie,
            });

        }catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao adicionar série ao treino!" });
        }
    }

    static async remove(req:Request, res:Response){
        try{
            const id = Number(req.params.id);
            const result = await treinoRepo().delete(id);

            if (result.affected === 0) {
                return res.status(404).json({ message: "Treino não encontrado!" });
            }

            return res.status(204).send();
        }catch(error : any){
            console.error(error)
            return res.status(500).json({message: "Erro ao remover treino!"})
        }
    }

    static async getById(req:Request, res:Response){
        try{
            const id = Number(req.params.id);

            const treino = await treinoRepo().findOne({
                where: { id },
                relations: ["series", "series.exercicio", "usuario"] 
            });

            if (!treino) {
                return res.status(404).json({ message: "Treino não encontrado!" });
            }

            return res.status(200).json({ treino });
        }catch(error : any){
            console.error(error)
            return res.status(500).json({message: "Erro ao buscar treino!"})
        }
    }

    static async getByUser(req:Request, res:Response){
        try{
            const usuarioId = Number(req.params.usuarioId);

            const usuario = await usuarioRepo().findOne({ where: { id: usuarioId } });

            if (!usuario) {
                return res.status(404).json({ message: "Usuário não encontrado!" });
            }

            const treinos = await treinoRepo().find({
                where: { usuario: { id: usuarioId } },
                relations: ["series", "series.exercicio"]
            });

            if (treinos.length === 0) {
                return res.status(404).json({ message: "Nenhum treino encontrado para esse usuário!" });
            }

            return res.status(200).json({ treinos });
        }catch(error : any){
            console.error(error)
            return res.status(500).json({message: "Erro ao buscar treinos!"})
        }
    }

    static async getByUserAndDate(req:Request, res:Response){
        try{
            const usuarioId = Number(req.params.usuarioId);
            const { inicio, fim } = req.body;

            if (!inicio || !fim) {
                return res.status(400).json({ message: "É necessário informar inicio e fim no body!" });
            }

            const usuario = await usuarioRepo().findOne({ where: { id: usuarioId } });

            if (!usuario) {
                return res.status(404).json({ message: "Usuário não encontrado!" });
            }

            const treinos = await treinoRepo().find({
                where: {
                    usuario: { id: usuarioId },
                    dataCriacao: Between(new Date(inicio), new Date(fim))
                },
                relations: ["series", "series.exercicio"]
            });

            if (treinos.length === 0) {
                return res.status(404).json({ message: "Nenhum treino encontrado nesse intervalo!" });
            }

            return res.status(200).json({ treinos });
        }catch(error : any){
            console.error(error)
            return res.status(500).json({message: "Erro ao buscar treinos!"})
        }
    }

    static async getAll(req:Request, res:Response){
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            const [treinos, total] = await treinoRepo().findAndCount({
                skip,
                take: limit,
                order: { id: "ASC" },
                relations: ["usuario", "series", "series.exercicio"] // trazer usuário e séries
            });

            if (treinos.length === 0) {
                return res.status(404).json({ message: "Nenhum treino encontrado!" });
            }

            return res.status(200).json({
                data: treinos,
                total,
                page,
                lastPage: Math.ceil(total / limit)
            });
        }catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao buscar treinos!" });
        }
    }
}

