import express from "express";
import { Doctor,Service,Appointment } from "../modules/modules.mjs";


export const DoctorRoutes=express.Router();
export const ServiceRoutes=express.Router();
export const AppointmentRouter=express.Router();
export const SignIn=express.Router();

DoctorRoutes.get('/',async(req,res)=>{
     try {
        const doctors=await Doctor.find({}).populate('service')
        return res.status(200).send(doctors)

        
     }catch (error) {
             res.status(500).send({message:error.message})
     }
})

DoctorRoutes.get('/:_id',async(req,res)=>{
    try {
        const {_id}=req.params;
       const doctor=await Doctor.find({_id}).populate('service')
       if(!doctor){
        return res.status(404).send({message:`Doctor with the id ${_id} not found`})
       }
       return res.status(200).send(doctor)

    }catch (error) {
            res.status(500).send({message:error.message})
    }
})

DoctorRoutes.delete('/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const doctor=await Doctor.findByIdAndDelete(id);
        if(!doctor){
            return res.status(404).send({message:`Doctore with id ${id} not found`})
        }
        return res.status(200).send({message:`Delete doctore with the id ${id} successfully`})
    }catch (error) {
            res.status(500).send({message:error.message})
    }
})

DoctorRoutes.post('/',async(req,res)=>{
    try {
        const newDoctor=req.body;
        const doctor=await Doctor.create(newDoctor);
        return res.status(200).send({message:`a new docor has been successfully creted `,doctor})
    }catch (error) {
            res.status(500).send({message:error.message})
    }
})

//----------------------------------------------------------------------------------------

ServiceRoutes.get('/',async(req,res)=>{
    try {
        const services=await Service.find({})
        return res.status(200).send(services)
    }catch (error) {
        return res.status(500).send({message:error.message})
    }
         
})


ServiceRoutes.post('/',async(req,res)=>{
    try {
        const newService=req.body;
        const service=await Service.create(newService);
        return res.status(200).send(service)
    }catch (error) {
        return res.status(500).send({message:error.message})
    }
         
})

ServiceRoutes.delete('/:id',async(req,res)=>{
    try {
        const service=req.params.id;
        const serviceDeleted=await Service.findByIdAndDelete(service)
        if(!serviceDeleted){ 
            return res.status(404).send({message:`Service with the id ${service} not found`})
        }
        return res.status(200).send({message:`service with the id ${service} has been deleted successfully`})


    }catch (error) {
        return res.status(500).send({message:error.message})
    }
         
})


//------------------------------------------------------------------------------------------------------------------
AppointmentRouter.get('/',async(req,res)=>{
    try {
        const appointments=await Appointment.find({}).populate('doctor')
        return res.status(200).send(appointments)
    }catch (error) {
        return res.status(500).send({message:error.message})
    }
         
})

AppointmentRouter.get('/patient/:patientId',async(req,res)=>{
    try {
        const {patientId} = req.params;
        const appointment= await Appointment.find({ patientId }).populate('doctor').populate('service');
        if(!appointment){
            return res.status(404).send({message:`Appointment with the patient  ${patientId} not found`})
        }   
        return res.status(200).send(appointment);
    }catch (error) {
        return res.status(500).send({message:error.message})
    }
         
})


AppointmentRouter.get('/doctor/:doctorId',async(req,res)=>{
    try {
        const {doctorId} = req.params;
           
        const appointment= await Appointment.find({ doctor:doctorId}).populate('doctor');
        if(!appointment){
            return res.status(404).send({message:`Appointment with the doctor  ${doctorId} not found`})
        }
        return res.status(200).send(appointment);
    }catch (error) {
        return res.status(500).send({message:error.message})
    }
         
})

AppointmentRouter.post('/',async(req,res)=>{
    try {
        const appointment = req.body;
        console.log(appointment)
        const appointment_= await Appointment.create(appointment);
        return res.status(200).send(appointment_);
    }catch (error) {
        return res.status(500).send({message:error.message})
    }
         
})

//------------------------------------------------------------------------------------

 SignIn.post('/',async(req,res)=>{
    try{
        const {userName,password}=req.body
        const user=await Doctor.findOne({userName,password}).populate('service')
        if(!user){
            return res.status(404).send({result:0})
        }else{
            return res.status(200).send({result:1,user})
        }

    }catch(error){
        return res.status(500).send({message:error.message})

    }

})