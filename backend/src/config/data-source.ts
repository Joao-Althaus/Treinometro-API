import "reflect-metadata";
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import Usuario from '../entities/Usuario';
import Exercicio from '../entities/Exercicio';
import Serie from '../entities/Serie';
import Treino from '../entities/Treino';

dotenv.config({ quiet: true });

export const AppDataSource = new DataSource ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true, // For dev only. 
    logging: false,
    entities: [Usuario,Exercicio,Serie,Treino]
});