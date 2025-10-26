import axios from 'axios';

export const getDoctors=async()=>{

        const Doctors=await fetch('http://localhost:5000/api/doctor',{method:'GET'});
        const json=await Doctors.json();
        return json;
   
}

//export default doctorsFunctions;