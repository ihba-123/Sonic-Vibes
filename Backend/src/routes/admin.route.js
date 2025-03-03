import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { createSong } from "../controller/admin.controller.js";
const router = Router();

router.get("/", protectRoute, requireAdmin, createSong); //Check first user is authenticate and next user is admin or not

export default router;
