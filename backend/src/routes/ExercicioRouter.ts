import { Router } from "express";
import { ExercicioController } from "../controllers/ExercicioControler";

const router = Router();

router.post("/",ExercicioController.create);
router.patch("/:id",ExercicioController.update);
router.delete("/:id",ExercicioController.remove);
router.get("/",ExercicioController.page);
router.get("/:id",ExercicioController.getById);

export default router;