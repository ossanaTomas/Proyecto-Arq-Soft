import React, { useState, useEffect,useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ConfirmReserva.module.css";
import MenuBar from "../../Components/MenuBar/MenuBar";
import { AuthContext } from "../../Context/AuthContext";



async function getuserbyId(id) {
  const response = await fetch(`http://localhost:8090/user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("Error al obtener el usuario");
  return await response.json();
}



function ConfirmReserva() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const reserva = location.state?.reserva;
   const[users, setUsers]= useState(null); 

 useEffect(() => {
  if (user?.id) {
    getuserbyId(user.id).then(setUsers).catch(console.error);
  }
}, [user]);


       if (!reserva || !user) {
    return <div>Error: Información de reserva o usuario no disponible.</div>;
  }


   
  const { hotel, dateStart, dateFinish, personas } = reserva;
  const dias = calcularDias(dateStart, dateFinish);

  const handleConfirmarReserva = async () => {
    try {
      const response = await fetch("http://localhost:8090/reserv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hotel_id: hotel.id,
          user_id: user.id,
          date_start: new Date(dateStart).toISOString(),
          date_finish: new Date(dateFinish).toISOString(),
          hotel_rooms: parseInt(reserva.personas, 10)
        }),
      });
       console.log("cantidad de personas que mando")
      if (response.ok) {
        alert("Reserva confirmada exitosamente!");
        navigate("/");
      } else {
        alert("Ocurrió un error al confirmar la reserva.");
      }
    } catch (error) {
      console.error("Error al confirmar reserva:", error);
      alert("Error de conexión con el servidor.");
    }
  };

  return (
      <div className={styles.selectedhotelcontainer}>
      <MenuBar />
    <div className={styles.container}>

  <h2 className={styles.title}>Confirmar Reserva</h2>

  <div className={styles.columns}>
    {/* Columna izquierda: datos del usuario */}
    <div className={styles.column}>
      <h3 className={styles.sectionTitle}>Información del Usuario</h3>
      {users?(
        <>
      <div className={styles.infoGroup}>
        <span className={styles.infoLabel}>Nombre:</span>
        <span className={styles.infoValue}>{users.name}</span>
      </div>
      <div className={styles.infoGroup}>
        <span className={styles.infoLabel}>Apellido:</span>
        <span className={styles.infoValue}>{users.last_name}</span>
      </div>
      <div className={styles.infoGroup}>
        <span className={styles.infoLabel}>Email:</span>
        <span className={styles.infoValue}>{users.email}</span>
      </div>
      </>
      ):(    <p>Cargando información del usuario...</p>)
    }
      {/* Agrega más campos si querés */}
    </div>

    {/* Columna derecha: datos de la reserva */}
    <div className={styles.column}>
      <h3 className={styles.sectionTitle}>Datos de la Reserva</h3>
      <div className={styles.infoGroup}>
        <span className={styles.infoLabel}>Hotel:</span>
        <span className={styles.infoValue}>{reserva.hotel.name}</span>
      </div>
      <div className={styles.infoGroup}>
        <span className={styles.infoLabel}>Fecha de ingreso:</span>
        <span className={styles.infoValue}>{reserva.dateStart}</span>
      </div>
      <div className={styles.infoGroup}>
        <span className={styles.infoLabel}>Fecha de salida:</span>
        <span className={styles.infoValue}>{reserva.dateFinish}</span>
      </div>
      <div className={styles.infoGroup}>
        <span className={styles.infoLabel}>Dias:</span>
        <span className={styles.infoValue}>{dias}</span>
      </div>
      <div className={styles.infoGroup}>
        <span className={styles.infoLabel}>Total Huéspedes:</span>
        <span className={styles.infoValue}>{reserva.personas}</span>
      </div>
    </div>
  </div>

  <button className={styles.button} onClick={handleConfirmarReserva} >
    Confirmar Reserva
  </button>

</div>
</div>

  );
}

function calcularDias(start, end) {
  const d1 = new Date(start);
  const d2 = new Date(end);
  return Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
}

export default ConfirmReserva;
