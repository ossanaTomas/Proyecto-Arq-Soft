import React,{useState} from "react";



function Buscador(){

const[search,setSearch]=useState('')
const[sort,setSort]=useState('')


const handleChange =async(e)=>{

}

    return(
  <div>
    <div>
    <form  >
        <input type="text" placeholder="Buscar.." onChange={e => setSearch(e.target.value)} />
        
    </form>
    </div>
    <div>
        <select onChange={handleChange}>
      <option value="opcion1">name</option>
      <option value="opcion2">apellido</option>
      <option value="opcion3">gustos</option>
    </select>
    </div>
 </div>
    )

}

export default Buscador;