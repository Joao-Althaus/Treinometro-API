import {Request, Response} from "express"
import { AppDataSource } from "../config/data-source"
import Exercicio,{Musculo} from "../entities/Exercicio"

const exercicioRepo = () => AppDataSource.getRepository(Exercicio);

export class ExercicioController{

    static async create(req:Request, res:Response){
        try{
            const {nome,descricao,musculo} = req.body;

            if (!Object.values(Musculo).includes(musculo)) {
                return res.status(400).json({ 
                    message: `Musculo inválido! Valores válidos: ${Object.values(Musculo).join(", ")}` 
                });
            }

            const exercicio = new Exercicio();
            exercicio.nome = nome;
            exercicio.descricao = descricao;
            exercicio.musculo = musculo;

            const savedExercicio = await exercicioRepo().save(exercicio);

            return res.status(201).json({message: "Exercicio criado com sucesso!", Exercicio: savedExercicio});

        }catch(error:any){
            if (error.code === "23505") {
                return res.status(400).json({ message: "Já existe um exercicio com esse nome! " + req.body.nome, });
            }
            console.log(error);
            res.status(500).json({message:"Erro ao criar exercicio!"});
        }
    }

    static async update(req:Request, res:Response){
        try{
            const id = Number(req.params.id)

            const exercicio = await exercicioRepo().findOne({ where: {id} });
            if(!exercicio){
                return res.status(404).json({message: "Exercicio não encontrado!"});
            }

            const {nome,descricao,musculo} = req.body;
            if (nome !== undefined) exercicio.nome = nome;
            if (descricao !== undefined) exercicio.descricao = descricao;
            if (musculo !== undefined) {
                if (!Object.values(Musculo).includes(musculo)) {
                    return res.status(400).json({ 
                        message: `Musculo inválido! Valores válidos: ${Object.values(Musculo).join(", ")}` 
                    });
                }
                exercicio.musculo = musculo;
            }

            const savedExercicio = await exercicioRepo().save(exercicio);

            return res.status(200).json({message: "Exercicio atualizado com sucesso!", Exercicio: savedExercicio});
        } catch(error : any){
            if (error.code === "23505") {
                return res.status(400).json({ message: "Já existe um exercicio com esse nome! " + req.body.nome, });
            }
            console.log(error);
            res.status(500).json({message:"Erro ao atualizar exercicio!"});
        }
    }

    static async remove(req:Request, res:Response){
         try{
            const id = Number(req.params.id);
            const result = await exercicioRepo().delete(id);

            if (result.affected === 0) {
                return res.status(404).json({ message: "Exercicio não encontrado!" });
            }

            return res.status(204).send();

        }catch(error : any){
            res.status(500).json({message:"Erro ao deletar exercicio!"});
        }
    }

    static async getById(req:Request, res:Response){
        try{
            const id = Number(req.params.id);
            let exercicio = await exercicioRepo().findOne({ where: { id } });
            if (!exercicio) {
                return res.status(404).json({ message: "Exercicio não encontrado!" });
            }
            
            return res.json({ exercicio });
        }catch( error: any){
            console.error(error);
            return res.status(500).json({ message: "Erro ao buscar exercícios!" });
        }
    }

    static async page(req:Request, res:Response){
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            const [exercicios, total] = await exercicioRepo().findAndCount({
                skip,
                take: limit,
                order: { id: "ASC" }
            });

            return res.json({
                exercicios: exercicios,
                total,
                page,
                lastPage: Math.ceil(total / limit)
            });

        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao buscar exercícios!" });
        }
    }
}