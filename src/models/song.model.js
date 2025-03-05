import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title : {
    type: String,
    required : true
  }, 
  artist : {
    type: String,
    required : true
  }, 
  imageUrl : {
    type: String,
    required : true
  },
  audioUrl : {
    type: Number,
    required : true
  },
  duration : {
    type: Number,
    required : true
  },
  albumId : {
    type : mongoose.Schema.Types.ObjectId, // it is like foreign key in sql where it shows the relationship
    ref : 'Album',
    require : false
  }
    
},{timestamps : true});

export const Song = mongoose.model('Song',songSchema);