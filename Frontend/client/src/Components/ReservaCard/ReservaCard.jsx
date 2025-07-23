import React from "react";
import styles from "./ReservaCard.module.css";

const ReservaCard = ({ hotel, dateStart, dateFinish, personas, onReservar }) => {
  const dias = calcularDias(dateStart, dateFinish);

  return (
    <div className={styles.card}>
      <h2 className={styles.titulo}>Nombre:  {hotel.name}</h2>
      <div className={styles.detalles}>
        <p className={styles.lineaDetalle}>
          <span className={styles.label}>Inicio estadia</span> {new Date(dateStart).toLocaleDateString()}
        </p>
        <p className={styles.lineaDetalle}>
          <span className={styles.label}>Fin estadia: :</span> {new Date(dateFinish).toLocaleDateString()}
        </p>
        <p className={styles.lineaDetalle}>
          <span className={styles.label}>Cantidad de días:</span> {dias}
        </p>
        <p className={styles.lineaDetalle}>
          <span className={styles.label}>Cantida de Personas:</span> {personas}
        </p>
      </div>
      <button onClick={onReservar} className={styles.boton}>
        Reservar
      </button>
    </div>
  );
};

function calcularDias(start, end) {
  const d1 = new Date(start);
  const d2 = new Date(end);
  return Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
}

export default ReservaCard;
