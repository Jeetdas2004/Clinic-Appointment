export type DoctorType={
    _id:String ,
    name:String,
    age:Number
    service:ServiceType,
    location:String,
    password:String,
    userName:String,
    email:String,
    phone:Number
}

export type ServiceType={
    _id:String,
    name:String,
    description:String,
    logo:string
}

export type AppointmentType={
    _id?:String,
    patientName:String,
    patientId:String,
    doctor:String,
    age:Number | undefined,
    illness:String,
    date:Date
}