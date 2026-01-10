

export const getServices=async()=>{
    const services = await fetch('http://localhost:5000/api/service',{method:'GET'})
    const json= await services.json()
    return json
}