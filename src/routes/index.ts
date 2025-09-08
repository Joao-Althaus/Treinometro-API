import { Router } from "express";
import usuarioRouter from "./UsuarioRouter"
import treinosRouter from './TreinoRouter'
import seriesRouter from './SerieRouter'
import exerciciosRouter from './ExercicioRouter'

const router = Router();

router.use('/usuarios', usuarioRouter);
router.use('/treinos', treinosRouter);
router.use('/series', seriesRouter);
router.use('/exercicios', exerciciosRouter);

export default router;