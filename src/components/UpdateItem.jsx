import axios from 'axios'
import React,{useState,useEffect} from 'react'
import App from '../App'

function UpdateItem({id,x}) {

    const[Data,setData]=useState({
        name:"",
        status:""
    })
   

    useEffect(()=>{

        const fetched=async()=>{
            
          await axios.get('http://localhost:8000/doors/'+id)
            .then((response) => setData({
                name:response.data.name || "",
                status:response.data.status || ""
            }))
            .catch(error => console.error('Error fetching data:', error));
        }
        fetched();
       
        },[id]);
    
    
    const handleChange=((e)=>{
            setData({...Data,[e.target.name]:e.target.value})
        })
    
    const handleSubmit =async(e)=>{
          e.preventDefault()
        
            try {
            await axios.put('http://localhost:8000/doors/'+id,Data)
                setData({name:'',status:''})
                alert('Data updated')
                x[0](!x[1])
                // {<App  change={change}/>}
                } catch (error) {
                    console.log(error)
                    alert('Data not update')
                }
        
    }

  return (
    <>
    <form onSubmit={handleSubmit}>
    <label >Name:</label>
    <input type="text" value={Data.name} name='name' onChange={handleChange} required/>

    <label >status:</label>
    <input type="text" value={Data.status} name='status' onChange={handleChange} required/>
    
    <button type='Submit'>update</button>
    
    </form>
    
    </>
  )
}

export default UpdateItem