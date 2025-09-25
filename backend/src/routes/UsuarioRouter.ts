import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";

const router = Router();

router.post("/",UsuarioController.create);
router.patch("/:id",UsuarioController.update);
router.delete("/:id",UsuarioController.remove);
router.get("/",UsuarioController.page);
router.get("/:id",UsuarioController.getById);

export default router;