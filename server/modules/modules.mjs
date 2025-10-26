
import mongoose from 'mongoose'


const appointmentSchema = new mongoose.Schema({

    patientId:{
        type: String,
        required:true
    },
    patientName:{

        type: String,
        required:true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    age:{
        type: Number,
        required: false
    }
    ,
    date: {
        type: Date,
        required: true
    },
    illness:{
        type: String,
        required:false
    },
}
,
{timestamps:true}

)

const serviceSchema = new mongoose.Schema({

    name:{
        type: String,
        required:true
    },
    description: {
        type: String,
         required: true
    },
    logo:{
        type: String,
        required:true
    },
    
}
,
{timestamps:true}

)


const doctorSchema = new mongoose.Schema({

    name:{
        type: String,
        required:true
    },
    age: {
        type: Number,
         required: true
    },
    service:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required:true
    },
    location:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    userName:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    phone:{
        type: String,
        required:true
    }
    
}
,
{timestamps:true}

)

export const Appointment=mongoose.model('Appointment',appointmentSchema)
export const Service=mongoose.model('Service',serviceSchema)
export const Doctor=mongoose.model('Doctor',doctorSchema)


