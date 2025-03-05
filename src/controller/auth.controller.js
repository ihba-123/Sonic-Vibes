import {User} from '../models/user.model.js'

//This controller checks whether user is signin or login
export const authCallback = async(req , res)=>  {
  try {
    const {id , firstName , lastName , imageUrl} =  req.body;
    
    //check wheather  user already exist or not
    const user = await User.findOne({clerkId : id});

    if(!user){
      //create new user or sign up
      await user.create({
        clerkId : id,
        fullName : `${firstName} ${lastName}`,  
        imageUrl
      })
    }
    res.status(200).json({msg:"Successful"})
  } catch (error) {
    console.log(error);
    res.status(500).json({msg:"Something went wrong"})
  }
}