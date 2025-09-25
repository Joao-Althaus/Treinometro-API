import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import Treino from './Treino';

@Entity ({name: 'usuarios'})
export default class Usuario{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({ type: 'text' })
    nome!:string;

    @Column({ type: 'text', unique: true })
    email!:string;

    
    @Column({ type: 'decimal', precision: 5, scale: 2 })
    peso!:number;
    
    @Column({ type: 'decimal', precision: 5, scale: 2 })
    altura!:number;
    
    @CreateDateColumn({ type: 'timestamptz', default: () => 'now()' })
    dataCriacao!:Date;

    @OneToMany(() => Treino, treino => treino.usuario)
    treinos!: Treino[];
}