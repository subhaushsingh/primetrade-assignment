import { Router } from "express";
import { create, getAll, remove } from "./task.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = Router();

router.use(protect);

router.post("/", create);
router.get("/", getAll);
router.delete("/:id", remove);

export default router;