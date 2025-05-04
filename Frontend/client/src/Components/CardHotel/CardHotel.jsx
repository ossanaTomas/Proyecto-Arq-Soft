// Mejoramos la tarjeta para hacerla más profesional y clara
// CardHotel.jsx
import React from 'react';
import styles from "./cardHotel.module.css";

function CardHotel({ hotel }) {

const { name, description, rooms, imagenes, amenities } = hotel;

const imagenUrl =
    Array.isArray(imagenes) && imagenes.length > 0 && imagenes[0].url
      ? imagenes[0].url //si tiene imagen muestro la primera que este tiene
      : "/hotel_default.webp"; //si no cuenta con ninguna imagen muestro lo que es una imagen default

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardContent}>
      <img
          className={styles.imagenContainer}
          src={imagenUrl}
          alt={`Imagen de ${name}`}
        />
        <h3 className={styles.hotelName}>{name}-{rooms}-</h3>
        <p className={styles.descripcion}>{description}</p>
         <ul className={styles.listaAmenities}>
          {(Array.isArray(amenities) ? amenities : [])
            .slice(0, 4)
            .map((amenity, index) => (
              <li key={amenity.id || index} className={styles.amenity}>
                {amenity.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default CardHotel; 

/* <img className={styles.imagenContainer} src={imagenUrl} alt={`Imagen de ${name}`} /> */