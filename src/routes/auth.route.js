import { Router } from "express";
import { authCallback } from "../controller/auth.controller.js";

const router = Router();

//This route checks whether user is signin or login
router.post('/callback', authCallback );

export default router;