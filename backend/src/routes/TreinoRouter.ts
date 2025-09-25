import { Router } from "express";
import { TreinoController } from "../controllers/TreinoController";

const router = Router();

router.post("/",TreinoController.create);
router.patch("/:id/series",TreinoController.addSerie);
router.delete("/:id",TreinoController.remove);
router.get("/",TreinoController.getAll);
router.get("/:id",TreinoController.getById);
router.get("/usuario/:usuarioId",TreinoController.getByUser);
router.get("/usuario/:usuarioId/data",TreinoController.getByUserAndDate);

export default router;