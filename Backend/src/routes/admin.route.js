import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware";
const router = Router();

router.get("/", protectRoute, requireAdmin, createSong); //Check first user is authenticate and next user is admin or not

export default router;
