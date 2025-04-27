// src/pages/IniciarSesion.js
import React from 'react';
import Bot from '../Components/Boton';
import MenuBar from '../Components/MenuBar';
import { useState,useEffect } from 'react';


const GetUsers=()=>{
    const [users, setUsers] = useState([0]); 

    useEffect(()=>{
        fetch(("http://localhost:8090/user"))
        .then((response)=>response.json())
        .then((users) => setUsers(users))
        .catch((error) => console.error("Error al obtener los datos:", error));
        
}, []); 

if (!users) return <p>Cargando usuario...</p>;

return  (
    <div>
        <h1>Lista de Usuarios</h1>
        <ul>
            {users.map((user, index) => (
                <li key={index}>
                    {user.name} --
                    {user.Email}
                    
                </li>
            ))}
        </ul>
    </div>
);
};




function Inicio() {
    return (
        <div className="full-background">
            <MenuBar>
            <Bot BotText={"Inciar sesion"} navegar={"/Login"}/> 
            <Bot BotText={"Registrarse"} navegar={"/register"}/>
            </MenuBar>
            <div className='containerP'>
              <GetUsers/>
               
            </div>
        </div>
    );
}

export default Inicio;