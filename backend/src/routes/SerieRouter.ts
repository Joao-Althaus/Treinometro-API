import { Router } from "express";
import { SerieController } from "../controllers/SerieController";

const router = Router();

router.post("/",SerieController.create);
router.patch("/:id",SerieController.update);
router.delete("/:id",SerieController.remove);
router.get("/:id",SerieController.getById);
router.get("/treino/:id",SerieController.getByTreino);
router.get("/",SerieController.getAll);

export default router;