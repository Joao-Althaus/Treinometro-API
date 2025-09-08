import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import Treino from './Treino';

@Entity ({name: 'usuarios'})
export default class Usuario{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({ type: 'text', unique: true })
    email!:string;

    @Column({ type: 'text' })
    name!:string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'now()' })
    dataCriacao!:Date;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    peso!:number;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    altura!:number;

    @OneToMany(() => Treino, treino => treino.usuario)
    treinos!: Treino[];
}