import React, { useState, useEffect } from 'react';
import styles from './Hoteldetails.module.css';

import Bot from '../../Components/Boton/Boton';

const getAmenities = async () => {
  return await fetch('http://localhost:8090/amenities', {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  }).then(res => res.json());
};

const HotelDetails = ({ hotel, onBack }) => {
  const [name, setName] = useState(hotel.name);
  const [description, setDescription] = useState(hotel.description);
  const [rooms, setRooms] = useState(hotel.rooms);
  const [imageFile, setImageFile] = useState(hotel.imagenes);
  const [currentImageUrl, setCurrentImageUrl] = useState(hotel.imagenes);

  const [amenities, setAmenities] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [showNewAmenityForm, setShowNewAmenityForm] = useState(false);
  const [newAmenityName, setNewAmenityName] = useState('');
  const [newAmenityDescription, setNewAmenityDescription] = useState('');

  const [confirmDelete, setConfirmDelete] = useState(false);

  // Cargar amenities del sistema
  useEffect(() => {
    getAmenities().then(data => {
      setAmenities(data);
    });

    // Extraer IDs de amenities del hotel recibido
    const amenityIds = hotel.amenities?.map(a => a.id) || [];
    setSelectedAmenities(amenityIds);


    if (Array.isArray(hotel.imagenes) && hotel.imagenes.length > 0) {
      setCurrentImageUrl("http://localhost:8090" + hotel.imagenes[0].url);
    }
  }, [hotel]);

  // Toggle de selección
  const toggleAmenity = (id) => {
    setSelectedAmenities(prev =>
      prev.includes(id) ? prev.filter(aid => aid !== id) : [...prev, id]
    );
  };

  // Crear una nueva amenity
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
        setAmenities(prev => [...prev, newAmenity]);
        setSelectedAmenities(prev => [...prev, newAmenity.id]);
        setNewAmenityName('');
        setNewAmenityDescription('');
        setShowNewAmenityForm(false);
      } else {
        alert("Error al agregar la amenity");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch("http://localhost:8090/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    return data.url; 
  };



  // Guardar cambios del hotel
  const handleUpdate = async () => {
    //primero actualizamos la imagen
    let newImageUrl = '';
    if (imageFile) {
      newImageUrl = await handleImageUpload();
    }

    const updatedHotel = {
      name: name.trim(),
      description: description.trim(),
      rooms: Number(rooms),
      amenities: selectedAmenities,
      imagenes: newImageUrl ? [{ url: newImageUrl }] : hotel.imagenes // si no subís una nueva, mantenés la anterior
    };

    try {
      const response = await fetch(`http://localhost:8090/hotels/${hotel.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedHotel)
      });

      if (response.ok) {
        alert("Hotel actualizado correctamente");
        window.location.reload();
        onBack(); // volver a lista
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error("Error al actualizar:", err);
      alert("Error de red");
    }
  };

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:8090/hotels/${hotel.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      alert("Hotel eliminado correctamente");
      window.location.reload();
    } else {
      const error = await res.json();
      alert("Error al eliminar: " + error.message);
    }
  };



  return (
    <div className={styles.form}>

      <form onSubmit={e => { e.preventDefault(); handleUpdate(); }} className={styles.regNewUser}>
        <h1>Editar hotel</h1>
        <input
          type="text"
          placeholder="Nombre Hotel"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className={styles.input}
        />

        <textarea
          placeholder="Descripción"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className={styles.input}
        />

        <input
          type="number"
          placeholder='Cantidad de habitaciones'
          value={rooms}
          onChange={e => setRooms(e.target.value)}
          required
          className={styles.input}
        />

        {currentImageUrl && (
          <div className={styles.imgContainer1} ><b>Imagen actual:</b>
            <div className={styles.imgContainer2}>
              <img src={currentImageUrl} alt="Imagen actual del hotel" className={styles.img} />
            </div>
          </div>
        )}
        <div className={styles.imgContainer1} ><b>Modificar Imagen:</b></div>
        <input
          type="file"
          accept="image/*"
          onChange={e => {
            setImageFile(e.target.files[0]);
            setCurrentImageUrl(URL.createObjectURL(e.target.files[0]));
          }}
          className={styles.input}
        />

        <div className={styles.amenitiesGrid}>
          {amenities.map(amenity => (
            <div
              key={amenity.id}
              className={`${styles.amenityCard} ${selectedAmenities.includes(amenity.id) ? styles.selected : ''}`}
              onClick={() => toggleAmenity(amenity.id)}
            >
              <h4>{amenity.name}</h4>
            </div>
          ))}

          <div className={styles.amenityCard} onClick={() => setShowNewAmenityForm(true)}>
            <h4>+ Nueva amenity</h4>
          </div>
        </div>

        {showNewAmenityForm && (
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
            <button type="button" onClick={() => setShowNewAmenityForm(false)}>Cancelar</button>
          </div>
        )}
        <div className={styles.buttonGroup}>
          <button className={styles.backButton} onClick={onBack}>← Volver</button>
          <button className={styles.subimiButton} type="submit">Guardar cambios</button>
          <button className={styles.deletButton} type="button" onClick={() => setConfirmDelete(true)}>Eliminar Hotel</button>
        </div>
      </form>
      {confirmDelete && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h2>¿Seguro que desea eliminar el Hotel:"<span className={styles.hotelNameHighlight}>{hotel.name}</span>"?</h2>
            <p>Esta acción no podrá revertirse</p>
            <div className={styles.modalActions}>
              <button className={styles.confirmBtn} onClick={() => handleDelete()}>Confirmar</button>
              <button className={styles.cancelBtn} onClick={() => setConfirmDelete(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelDetails;
