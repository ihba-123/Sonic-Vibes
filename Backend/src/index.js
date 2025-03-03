import express from 'express'
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express'
import userRoutes from './routes/user.route.js';
import adminRoutes from './routes/admin.route.js';
import authRoutes from './routes/auth.route.js';
import songRoutes from './routes/song.route.js';
import albumsRoutes from './routes/album.route.js';
import statsRoutes from './routes/stats.route.js';
import { connectDB } from './lib/db.js';
dotenv.config();


const app =  express();
const PORT=process.env.PORT || 8000 ;

//middleware
app.use(express.json()) // parse req.body
app.use(clerkMiddleware()) // it check wheather user is login to allow  to visit the private route

//Routes
app.use('/api/users' , userRoutes)
app.use('/api/auth' , authRoutes)
app.use('/api/admin' , adminRoutes)
app.use('/api/songs' , songRoutes)
app.use('/api/albums' , albumsRoutes)
app.use('/api/stats' , statsRoutes)



app.listen(PORT , () =>{
  console.log(`The server is running on the PORT ${PORT}`)
  connectDB();
})