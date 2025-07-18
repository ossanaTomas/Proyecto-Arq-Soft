import React, { useState } from 'react';
import styles from "./AmenitiesGestion.module.css";

function AmenitiesGestion({ ameniti, isEditing, onClick, onSave, onDelete, onCancel }) {
  const [editName, setEditName] = useState(ameniti.name);
  const [editDescription, setEditDescription] = useState(ameniti.description);


  const truncateWords = (text, limit) => {
    const words = text.split(" ");
    return words.length <= limit ? text : words.slice(0, limit).join(" ") + "...";
  };

  if (isEditing) {
    return (
      <div className={styles.cardContainer}>
        <div className={styles.cardContent}>
        <label className={styles.labelTit} htmlFor={`name-${ameniti.id}`}>Editar Amenity:</label>
        <label className={styles.label} htmlFor={`name-${ameniti.id}`}>Nombre:</label>
          <input
            className={styles.input}
            type="text"
            value={editName}
            onChange={e => setEditName(e.target.value)}
          />
        <label className={styles.label} htmlFor={`desc-${ameniti.id}`}>Descripción:</label>
          <textarea
            className={styles.textarea}
            value={editDescription}
            onChange={e => setEditDescription(e.target.value)}
            rows={3}
          />
    <div className={styles.buttonGroup}>
       <button className={styles.cancelButton} onClick={onCancel}>Cancelar</button>
      <button className={styles.subimiButton} onClick={() => onSave({ ...ameniti, name: editName, description: editDescription })}>Guardar</button>
      <button className={styles.deletButton} onClick={onDelete}>Eliminar</button>
      
        


          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cardContainer} onClick={onClick}>
      <div className={styles.cardContent}>
        <h3 className={styles.amenityName}>{ameniti.name}</h3>
        <p className={styles.descripcion}>{truncateWords(ameniti.description, 20)}</p>
      </div>
    </div>
  );
}

export default AmenitiesGestion;
