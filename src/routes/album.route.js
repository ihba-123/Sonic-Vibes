import { Router } from "express";
import { getAlbumById, getAllAlbums } from "../controller/album.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = Router();

router.get('/' , protectRoute ,getAllAlbums); //first user must login and then access the album
router.get('/:albumId' , protectRoute, getAlbumById);

export default router;