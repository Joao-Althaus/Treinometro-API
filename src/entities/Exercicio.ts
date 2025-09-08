import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Musculo {
    PEITO = "peito",
    PERNA = "perna",
    COSTAS = "costas",
    BICEPS = "biceps",
    TRICEPS = "triceps",
    OMBRO = "ombro",
    PANTURILHA = "panturilha"
}

@Entity('exercicios')
export default class Exercicio {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({ type: 'text' })
    nome!:string;

    @Column({ type: 'text' })
    descricao!:string;

    @Column({
        type: 'enum',
        enum: Musculo
    })
    musculo!:Musculo;
}
