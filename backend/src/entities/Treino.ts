import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Usuario from './Usuario'
import Serie from "./Serie";

@Entity('treinos')
export default class Treino{
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Usuario, usuario => usuario.treinos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'usuario_id' })
    usuario!: Usuario;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'now()' })
    dataCriacao!: Date;

    @OneToMany(() => Serie, serie => serie.treino)
    series!: Serie[];
}