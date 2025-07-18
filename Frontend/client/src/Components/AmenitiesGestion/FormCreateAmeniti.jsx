import React, { useState } from "react";
import styles from './FormCreateAmeniti.module.css';

function FormCreateAmeniti({ onClose, onCreated }) {
  const [newAmenityName, setNewAmenityName] = useState('');
  const [newAmenityDescription, setNewAmenityDescription] = useState('');

  const addNewAmenity = async () => {
    if (!newAmenityName.trim()) return alert("El nombre es obligatorio");

    try {
      const response = await fetch('http://localhost:8090/amenities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newAmenityName.trim(),
          description: newAmenityDescription.trim()
        })
      });

      const newAmenity = await response.json();
      if (response.ok) {
        setNewAmenityName('');
        setNewAmenityDescription('');
        onCreated?.(newAmenity);
      } else {
        alert("Error al agregar la amenity");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className={styles.newAmenityForm}>
      <input
        type="text"
        placeholder="Nombre de nueva amenity"
        value={newAmenityName}
        onChange={e => setNewAmenityName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={newAmenityDescription}
        onChange={e => setNewAmenityDescription(e.target.value)}
      />
      <button type="button" onClick={addNewAmenity}>Agregar</button>
      <button type="button" onClick={onClose}>Cancelar</button>
    </div>
  );
}

export default FormCreateAmeniti;
