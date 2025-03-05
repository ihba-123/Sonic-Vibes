import { Router } from "express";
import { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs } from "../controller/song.controller.js";
import {protectRoute, requireAdmin} from '../middleware/auth.middleware.js'
const router = Router();

router.get('/' ,protectRoute, requireAdmin, getAllSongs); //only allow admin to fetch the songs
router.get('/featured' ,protectRoute, requireAdmin, getFeaturedSongs); 
router.get('/made-for-you' ,protectRoute,  getMadeForYouSongs); 
router.get('/trending' ,protectRoute, getTrendingSongs); 

export default router;