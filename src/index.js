import express from 'express'
import dotenv from 'dotenv';
import path from 'path'
import { clerkMiddleware } from '@clerk/express'
import userRoutes from './routes/user.route.js';
import adminRoutes from './routes/admin.route.js';
import authRoutes from './routes/auth.route.js';
import songRoutes from './routes/song.route.js';
import albumsRoutes from './routes/album.route.js';
import statsRoutes from './routes/stats.route.js';
import { connectDB } from './lib/db.js';
import fileUpload from 'express-fileupload';
dotenv.config();


const app =  express();
const PORT=process.env.PORT || 3000 ;
const __dirname = path.resolve(); // takes more path as argument and resolve them in absolute path

//middleware
app.use(express.json()) // parse req.body
app.use(clerkMiddleware()) // it check wheather uszer is login to allow  to visit the private route
app.use(fileUpload({  //for uploading the file in cloudinary
  useTempFiles: true,
  tempFileDir: path.join(__dirname, 'tmp'),// to store the image or audio uploaded in the cloudinary
  createParentPath: true,
  limits : {
    fileSize : 10 * 1024 * 1024 // 10mb file is maximum
  }
}));

//error handler middleware
app.use((err, req, res, next) => {
  res.status(500).json({message:process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message}); //it shows different error in production and different in development phase
});


//Routes
app.use('/api/users' , userRoutes)
app.use('/api/auth' , authRoutes)
app.use('/api/admin' , adminRoutes)
app.use('/api/songs' , songRoutes)
app.use('/api/albums' , albumsRoutes)
app.use('/api/stats' , statsRoutes)





app.listen(PORT , () =>{
  connectDB();
  console.log(`The server is running on the PORT ${PORT}`)
})