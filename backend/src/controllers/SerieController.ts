import {Request, Response} from "express"
import { AppDataSource } from "../config/data-source"
import Serie from "../entities/Serie";
import Treino from "../entities/Treino";
import Exercicio from "../entities/Exercicio";

const serieRepo = ()=> AppDataSource.getRepository(Serie);
const exercicioRepo = () => AppDataSource.getRepository(Exercicio);
const treinoRepo = () => AppDataSource.getRepository(Treino);

export class SerieController{

    static async create(req:Request, res:Response){
        try {
            const { exercicio_id, treino_id, carga, repeticoes } = req.body;

            if (!exercicio_id || !treino_id || !carga || !repeticoes) {
                return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
            }

            const exercicio = await exercicioRepo().findOneBy({ id: exercicio_id });
            if (!exercicio) {
                return res.status(404).json({ message: "Exercício não encontrado!" });
            }

            const treino = await treinoRepo().findOneBy({ id: treino_id });
            if (!treino) {
                return res.status(404).json({ message: "Treino não encontrado!" });
            }

            const serie = serieRepo().create({exercicio, treino, carga, repeticoes,});

            const savedSerie = await serieRepo().save(serie);

            return res.status(201).json({ message: "Série criada com sucesso!", serie: savedSerie });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao criar série!" });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const serie = await serieRepo().findOne({ where: { id } });
            if (!serie) {
                return res.status(404).json({ message: "Série não encontrada!" });
            }

            const { exercicioId, treinoId, carga, repeticoes } = req.body;

            if (exercicioId !== undefined) {
                const exercicio = await exercicioRepo().findOneBy({ id: exercicioId });
                if (!exercicio) {
                    return res.status(404).json({ message: "Exercício não encontrado!" });
                }
                serie.exercicio = exercicio;
            }

            if (treinoId !== undefined) {
                const treino = await treinoRepo().findOneBy({ id: treinoId });
                if (!treino) {
                    return res.status(404).json({ message: "Treino não encontrado!" });
                }
                serie.treino = treino;
            }

            if (carga !== undefined) serie.carga = carga;
            if (repeticoes !== undefined) serie.repeticoes = repeticoes;

            const savedSerie = await serieRepo().save(serie);

            return res.status(200).json({ message: "Série atualizada com sucesso!", serie: savedSerie });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao atualizar série!" });
        }
    }

    static async remove(req:Request, res:Response){
        try{
            const id = Number(req.params.id);
            
            const result = await serieRepo().delete(id);

            if (result.affected === 0) {
                return res.status(404).json({ message: "Série não encontrada!" });
            }

            return res.status(204).send();
        }catch(error :any){
            console.error(error);
            return res.status(500).json({ message: "Erro ao remover série!" });
        }
    }

    static async getById(req:Request, res:Response){
        try{
            const id = Number (req.params.id);

            const serie = await serieRepo().findOne({ where: {id}, relations: ["exercicio", "treino"] });

            if(!serie){
                return res.status(404).json({ message: "Série não encontrada!" });
            }

            return res.status(200).json({serie})
        }catch(error:any){
            console.error(error);
            return res.status(500).json({ message: "Erro ao buscar série!" });
        }
    }

    static async getByTreino(req: Request, res:Response){
        try{
            const treinoId = Number (req.params.id);

            const series = await serieRepo().find({
                where: { treino: { id: treinoId } },
                relations: ["exercicio"] 
            });

            if (series.length === 0) {
                return res.status(404).json({ message: "Nenhuma série encontrada para esse treino!" });
            }

            return res.status(200).json({series})
        }catch(error:any){
            console.error(error);
            return res.status(500).json({ message: "Erro ao buscar série!" });
        }
    }

    static async getAll(req:Request, res:Response){
        try{
            const series = await serieRepo().find({ relations: ["exercicio", "treino"] });

            if (series.length === 0) {
                return res.status(404).json({ message: "Nenhuma série encontrada!" });
            }

            return res.status(200).json({ series });
        }catch(error:any){
            console.error(error);
            return res.status(500).json({ message: "Erro ao buscar série!" });
        }
    }
}