import { Song } from "../models/song.model.js";
import {Album} from '../models/album.model.js'
import cloudinary from "../lib/cloudinary.js";


//helper function for cloudinary upload
const uploadToCloduinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath,{ //Upload file to cloudinary
      resource_type : "auto",
    })
    return result.secure_url  // it provide the uploded URL
  } catch (error) {
    console.log(error);
    throw new Error("Error uploading to cloudinary")
    
  }
}


//Creating a songs
  export const createSong = async( req, res, next) =>{
  try {
    if(!req.files || !req.files.audioFile || !req.files.imageFile){
      return res.status(400).json({ message: "Audio file and image file are required" });
    }
    const {title , artist , albumId , duration} = req.body;
    const audioFile = req.files.audioFile[0]
    const imageFile = req.files.imageFile[0]

    const audioUrl = await uploadToCloduinary(audioFile);
    const imageUrl = await uploadToCloduinary(imageFile);

    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId : albumId || null //if exist put it otherwise null
    })
    await song.save();

    //if songs belongs to the album then update the album's array
    if(albumId){
      await Album.findByIdAndUpdate(albumId , {
        $push : {
          songs : song._id
        }
      })
    }

    res.status(201).json({ message: "Song created successfully" });

  } catch (error) {
    console.log(err)
    next(err) //This middleware always return error code 500 which is present in the controller
  }
  }

  //Deleting the songs 

  export const deleteSong = async (req, res, next) => {
    try {
      const {id} = req.params;
      const song = await Song.findById(id);

      //if songs belongs to an album then update the songs album array
      if(song.albumId){
        await Album.findByIdAndUpdate(song.albumId , {
          $pull : {
            songs : song._id
          }
        })
      }

      await song.remove();

      res.status(200).json({ message: "Song deleted successfully" });
  }catch(err){
    next(err)
    console.log("Error in deleting the songs",err);
  }
}

//creating a albums
export const  createAlbum =  async (req, res, next) => {
  try {
    const {title, artist, releaseYear} = req.body;
    const {imageFile} = req.file;

    const imageUrl = await uploadToCloduinary(imageFile);

    const album = new Album({
      title,
      artist,
      imageUrl,
      releaseYear
    })
    
    await album.save();

    res.status(201).json({ message: "Album created successfully" });
  } catch (error) {
    console.log(error);
    next(error)
  }
}


//deleting the albums
export const deleteAlbum = async(req, res, next) => {
  try {
    const {id} = req.params;
    await Song.deleteMany({albumId : id})
    await Album.findByIdAndDelete(id);

    res.status(200).json({ message: "Album deleted successfully" });
  } catch (error) {
    console.log(error);
    next(error)
  }
}

//checking admin or not
export const checkAdmin = async (req, res, next) => {
  res.status(201).json({admin : true});
  
}