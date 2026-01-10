import express from 'express'
import http from 'http'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import {DoctorRoutes,AppointmentRouter,ServiceRoutes ,SignIn} from './routes/routes.mjs'
import cors from 'cors'
dotenv.config()
const app=express()
app.use(express.json())
app.use(cors({
      origin:'http://localhost:3000',
      methods:['GET','POST','PUT','DELETE'],
}))


const port=process.env.PORT

app.listen((port),()=>{
      console.log(`'hello from ${port}...`)
})

app.use('/api/doctor',DoctorRoutes)
app.use('/api/appointment',AppointmentRouter)
app.use('/api/service',ServiceRoutes)
app.use('/SignIn',SignIn)



const ClusterConnectionString=process.env.MongoConnectionString

mongoose.connect(ClusterConnectionString).then(()=>{
      console.log('nice connection with mongoDB')
})

