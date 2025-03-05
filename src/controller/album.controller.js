import { Album } from "../models/album.model.js"

export const getAllAlbums = async(req , res, next) => {
  try {
    const album = await Album.find();
    res.status(200).json(album)
  } catch (error) {
    next(error)
  }
}
export const getAlbumById = async(req , res, next) => {
  try {
    const{albumId} = req.params;
    const album = await Album.findById(albumId).populate("songs")  //populate  - fill in data automarically from other collection

    if(!album){
      return res.status(404).json("Album not found")
    }else{
      res.status(200).json(album)
    }
  } catch (error) {
    next(error)
  }
}