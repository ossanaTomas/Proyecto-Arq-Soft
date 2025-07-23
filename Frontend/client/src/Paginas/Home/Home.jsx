//home.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import Bot from '../../Components/Boton/Boton';
import MenuBar from '../../Components/MenuBar/MenuBar';
import styles from './Home.module.css';
import CardHotel from '../../Components/CardHotel/CardHotel';
import FiltroHotels from '../../Components/FilterHotels/FilterHotels';

import { useFetch } from '../../Components/usefetche';
import { useNavigate } from 'react-router-dom';



async function gethotels() {
  return await fetch('http://localhost:8090/hotels', {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json());
}




function Home() {
    const { user, logout } = useContext(AuthContext);

    const[hotels,setHotels]=useState([]);
    const [renderedData, setRenderedData] = useState([]);


       const navigate = useNavigate();

    const[selectHotel, setSelectedHotel]=useState(); 


useEffect(() => {
  gethotels().then(data => {
    setHotels(data);
    setRenderedData(data);  // actualizás el estado después de obtener los hoteles
  });
}, []);
    
 

const handleFiltrarHoteles=(hotels)=>{
     setRenderedData(hotels)
}


    const handleHotelClick=(hotel)=>{
      console.log("Este es el nombte", hotel)
      localStorage.setItem("selectedHotel", JSON.stringify(hotel));
      navigate('/hotel/reservar')
    }

    
    



    const renderAuthOptions = () => {
        if (user) {
         if(user.role=="admin"){
          return(
            <>
                <Bot BotText={`Hola ${user.name}`}/>
                <Bot BotText={"Administrar"}  navegar={'/hoteles/insertar'}/>
                <Bot BotText={"Cerrar sesión"}  onClick={logout}/>
            </>
          )
         }
           console.log(user)
            return (
                //cuando haga clik en hola user que haga otra cosa 
                <>
                <Bot BotText={`Hola ${user.name}`}/>
                <Bot BotText={"Cerrar sesión"}  onClick={logout}/>
                </>
            );  
        }
        return (
            <>
                <Bot BotText={"Iniciar sesión"} navegar={"/Login"} />
                <Bot BotText={"Registrarse"} navegar={"/register"} />
            </>
        );
    };

    return (
        <div className={styles.contenedor}>
          <MenuBar>
            {renderAuthOptions()}
          </MenuBar>
    
          <div className={styles.main}>
            <h2 className={styles.titulo}>Nuestros Hoteles</h2>

          <FiltroHotels onFiltrar={handleFiltrarHoteles} />

            <div className={styles.cardGrid}>
          <div className={styles.cardGrid2} >
        
          {renderedData.map((hotel) => (
  <CardHotel key={hotel.id} hotel={hotel} onClick={() => handleHotelClick(hotel)} />
))}
    
          </div>
            </div>
          </div>
        </div>
      );
}


export default Home;