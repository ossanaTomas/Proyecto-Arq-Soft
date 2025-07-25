// Mejoramos la tarjeta para hacerla más profesional y clara
// CardHotel.jsx
import React from 'react';
import styles from "./cardHotel.module.css";

function CardHotel({ hotel ,onClick}) {

const { name, description, imagenes, amenities } = hotel;

const BASE_URL = "http://localhost:8090";
const imagenUrl =
    Array.isArray(imagenes) && imagenes.length > 0 && imagenes[0].url
      ? `${BASE_URL}${imagenes[0].url}` //si tiene imagen muestro la primera que este tiene
      : "/hotel_default.webp"; //si no cuenta con ninguna imagen muestro lo que es una imagen default

     

const truncateWords = (text, limit) => {
  const words = text.split(" ");
  if (words.length <= limit) return text;
  return words.slice(0, limit).join(" ") + " . . . Click para ver mas";
};

 

  return (
    <div className={styles.cardContainer} onClick={onClick}>
        <img className={styles.imagenContainer}
          src={imagenUrl}
          alt={`Imagen de ${name}`}
        />
      <div className={styles.cardContent} >
       <div className={styles.infohotel}>
        <h3 className={styles.hotelName}>{name}</h3>
        <p className={styles.descripcion}>{truncateWords(description,28)}</p>
         <ul className={styles.listaAmenities}>
          {(Array.isArray(amenities) ? amenities : [])
            .slice(0, 4) //limito a 4 la cantidad de amenities que muestro
            .map((amenity, index) => (
              <li key={amenity.id || index} className={styles.amenity}>
                {amenity.name}
              </li>
            ))}
        </ul>
        </div>
      </div>
    </div>
  );
}

export default CardHotel; 

/* <img className={styles.imagenContainer} src={imagenUrl} alt={`Imagen de ${name}`} /> */