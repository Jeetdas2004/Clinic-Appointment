import { AppointmentType } from "../Types"

export const createAppointment=async(Data:AppointmentType)=>{
  
          const newAppointment=await fetch('http://localhost:5000/api/appointment',{method:'POST',headers: {
              'Content-Type': 'application/json'
               },
          body:JSON.stringify(Data)})
          return newAppointment.json()
}