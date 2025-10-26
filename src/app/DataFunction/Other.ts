

export const SignIn=async(Data:any)=>{
    try{
        const response=await fetch('http://localhost:5000/SignIn',{method:'POST',body:JSON.stringify(Data),
            headers:{
                'Content-Type':'application/json' }
        })
        const json=await response.json()
        return json   
    }catch(error){
      console.log(error)
    }

}