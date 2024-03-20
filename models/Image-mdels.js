import mongoose from "mongoose";


const imageDescription = new mongoose.Schema({
  imageId: {
    type: String,
    
  },
  description: {
    type: String,
  },
  tags: {
    type: String,
    
  }
}, 
  {timestamps: true});


const Image =mongoose.models.images || mongoose.model("images", imageDescription);

export default Image;