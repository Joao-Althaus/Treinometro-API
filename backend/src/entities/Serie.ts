import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Exercicio from "./Exercicio";
import Treino from "./Treino";

@Entity('series')
export default class Serie{

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Exercicio, { eager: true })
    @JoinColumn({ name: 'exercicio_id' })
    exercicio!: Exercicio;

    @ManyToOne(() => Treino, treino => treino.series, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'treino_id' })
    treino!: Treino;

    @Column({ type: 'int' })
    carga!: number;

    @Column({ type: 'int' })
    repeticoes!: number;
}