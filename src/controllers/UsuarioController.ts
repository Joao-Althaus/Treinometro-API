import {Request, Response} from "express"
import { AppDataSource } from "../config/data-source"
import Usuario from "../entities/Usuario";

const usuarioRepo = () => AppDataSource.getRepository(Usuario);

export class UsuarioController{

    static async create(req:Request, res:Response){
        try {
            const { email, nome, peso, altura } = req.body;

            if (!email || !nome || !peso || !altura) {
                return res.status(400).json({ message: "Todos os campos são obrigatórios." });
            }

            const user = new Usuario();
            user.email = email;
            user.nome = nome;
            user.peso = peso;
            user.altura = altura;

            const savedUser = await usuarioRepo().save(user);

            return res.status(201).json({message: "Usuario criado com sucesso!", usuario: savedUser});

        } catch (error : any) {
            console.error(error);
            if (error.code === "23505") {
                return res.status(400).json({ message: "E-mail já está em uso!" });
            }
            return res.status(500).json({ message: "Erro ao criar usuario" });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { email, nome, peso, altura} = req.body;

            let usuario = await usuarioRepo().findOne({ where: { id } });

            if (!usuario) {
                return res.status(404).json({ message: "Usuário não encontrado!" });
            }

            if (email !== undefined) usuario.email = email;
            if (nome !== undefined) usuario.nome = nome;
            if (peso !== undefined) usuario.peso = Number(peso);
            if (altura !== undefined) usuario.altura = Number(altura);

            const saved = await usuarioRepo().save(usuario);

            return res.json({ message: "Update feito com sucesso!", usuario: saved, });
        } catch (error: any) {
            if (error.code === "23505") {
                return res.status(400).json({ message: "E-mail já está em uso!" });
            }
            console.error(error);
            return res.status(500).json({ message: "Erro ao atualizar usuario!" });
        }
    }


    static async remove(req:Request, res:Response){
        try{
            const id = Number(req.params.id);

           const result = await usuarioRepo().delete(id);

            if (result.affected === 0) {
                return res.status(404).json({ message: "Usuário não encontrado!" });
            }

            return res.status(204).send();

        }catch(error : any){
            console.log(error)
            return res.status(500).json({ message: "Erro interno no servidor!" });
        }
    }

    static async getById(req:Request, res:Response){
        try{
            const id = Number(req.params.id);

            let usuario = await usuarioRepo().findOne({ where: { id } });
            if (!usuario) {
                return res.status(404).json({ message: "Usuário não encontrado!" });
            }

            return res.json({ usuario });

        } catch(error:any){
            console.error(error);
            return res.status(500).json({ message: "Erro interno no servidor!" });
        }
    }

    static async page(req:Request, res:Response){
       try{
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const [usuarios, total] = await usuarioRepo().findAndCount({
            skip,
            take: limit,
            order: {
                id: "ASC" 
            }
        });

        return res.json({
            Usuarios: usuarios,
            total,
            page,
            lastPage: Math.ceil(total / limit)
        });

        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: "Erro interno no servidor!" });
        }
    }
}