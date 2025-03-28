import UpdateItem from "./components/UpdateItem";
import axios from "axios";
import React, { useState, useEffect } from "react";

function App({change}) {
    const [items, setItems] = useState([]);
    const [idstate, setidstate] = useState("");
    
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get("http://localhost:8000/doors");
                setItems(response.data); 
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchItems();
    }, [change]);


    const Delete =async(id)=>{
      const response = await axios.delete("http://localhost:8000/doors/"+id)
                              .catch((er)=>console.log(er))
    }
    return (
        <>


            <h2>Door List</h2>

            <UpdateItem  id={idstate} />
            <ul>
                {items&& (
                    items.map((task) => (
                        <li key={task.id}>
                            {task.name} - {task.status} <button type="button"  onClick={()=>setidstate(task.id)}>Update</button> <button type="button"  onClick={()=> Delete(task.id)}>Delete</button>
                        </li>

                    ))
                )
              }

            </ul>
        </>
    );
}

export default App;
