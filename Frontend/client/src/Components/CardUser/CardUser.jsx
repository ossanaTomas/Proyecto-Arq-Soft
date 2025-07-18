import React from "react";
import styles from "./CardUser.module.css";

function CardUser({ user, onClick, moreInfo, onRequestRoleChange  }) {
  const { name, last_name, user_name, email, role, Address } = user;

  if (moreInfo) {
    return (
      <div className={styles.cardContainer}>
        <div className={styles.cardContent}>
          <h3 className={styles.labelTit}>Información del usuario:</h3>

          <p><strong>Nombre:</strong> {name}</p>
          <p><strong>Apellido:</strong> {last_name}</p>
          <p><strong>Nombre de usuario:</strong> {user_name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Rol:</strong> {role}</p>

          {Address && (
            <>
              <h4 className={styles.labelTit}>Dirección:</h4>
              <p><strong>Calle:</strong> {Address.Street}</p>
              <p><strong>Número:</strong> {Address.Number}</p>
              <p><strong>Ciudad:</strong> {Address.City}</p>
              <p><strong>País:</strong> {Address.Country}</p>
            </>
          )}
          <div className={styles.alingnButton}>
          <button
            className={styles.subimiButton}
            onClick={() => onRequestRoleChange(user)}
          >
            Cambiar rol
          </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cardContainer} onClick={onClick}>
      <div className={styles.cardContent}>
        <h3 className={styles.hotelName}>{name} {last_name}</h3>
        <h3 className={styles.hotelName}>{email}</h3>
        <p>Agregar cantidad de reservas - Históricas y actuales</p>
      </div>
    </div>
  );
}

export default CardUser;
