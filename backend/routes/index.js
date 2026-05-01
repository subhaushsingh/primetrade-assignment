import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import taskRoutes from "../modules/task/task.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/tasks",taskRoutes);

export default router;