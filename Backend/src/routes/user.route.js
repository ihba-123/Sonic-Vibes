import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

 router.get('/like' , protectRoute ,(req , res) => { //This custom middleware checks whether user is authenticate or not
  req.auth.userId
  res.send("User route with Get method")
 })



export default router