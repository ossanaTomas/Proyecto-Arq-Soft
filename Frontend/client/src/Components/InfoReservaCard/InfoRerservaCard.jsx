import React, { useState, useEffect } from "react";
import styles from "./InfoRerservaCard.module.css";

async function getHotelById(id) {
  return await fetch(`http://localhost:8090/hotel/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json());
}

async function getUserById(id) {
  return await fetch(`http://localhost:8090/user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json());
}

function InfoReservaCard({ reserva, onEdit, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const [hotel, setHotel] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (reserva?.hotel_id && reserva?.user_id) {
      getHotelById(reserva.hotel_id).then(setHotel);
      getUserById(reserva.user_id).then(setUser);
    }
  }, []);

  if (!hotel || !user) return null;

  const {
    id,
    date_start,
    date_finish,
    date_actual,
    hotel_rooms,
    total_price
  } = reserva;

  const formatFecha = (fecha) => new Date(fecha).toLocaleDateString();

  const calcularCantidadDias = () => {
    const start = new Date(date_start);
    const end = new Date(date_finish);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader} onClick={toggleExpand}>
        <h3 className={styles.titulo}>{hotel.name}</h3>
        <p className={styles.subtitulo}>
          Reserva desde {formatFecha(date_start)} hasta {formatFecha(date_finish)}
        </p>
        <p className={styles.infoExtra}>
          {calcularCantidadDias()} días | {hotel_rooms} Habitaciones
        </p>
      </div>

      {isExpanded && (
        <div className={styles.expandContent}>
          <div className={styles.columnas}>
            <div className={styles.columna}>
              <h4>Datos del Usuario</h4>
              <p><strong>Nombre:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>ID Usuario:</strong> {user.id}</p>
              <p><strong>Fecha de Reserva:</strong> {formatFecha(date_actual)}</p>
            </div>

            <div className={styles.columna}>
              <h4>Datos de la Reserva</h4>
              <p><strong>Hotel:</strong> {hotel.name}</p>
              <p><strong>Descripción:</strong> {hotel.description}</p>
              <p><strong>Días:</strong> {calcularCantidadDias()}</p>
              <p><strong>Total:</strong> ${total_price}</p>
            </div>
          </div>

          <div className={styles.botones}>
            <button className={styles.btnEditar} onClick={() => onEdit(reserva)}>Editar</button>
            <button className={styles.btnEliminar} onClick={() => onDelete(reserva)}>Eliminar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InfoReservaCard;
