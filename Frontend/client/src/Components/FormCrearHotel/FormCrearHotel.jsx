import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HotelForm(){
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rooms, setRooms] = useState(0);
  const [amenities, setAmenities] = useState([]); // lista de amenities disponibles
  const [selectedAmenities, setSelectedAmenities] = useState([]); // las que elige el usuario

  useEffect(() => {
    // Al cargar el componente, pedimos las amenities al backend
    axios.get('http://localhost:8090/amenities')
      .then(res => setAmenities(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleCheckboxChange = (id) => {
    // Agrega o saca un amenity del array cuando el checkbox cambia
    setSelectedAmenities(prev =>
      prev.includes(id)
        ? prev.filter(a => a !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const hotelData = {
      name,
      description,
      rooms,
      amenities: selectedAmenities, // le pasamos los ids al backend
    };

    axios.post('http://localhost:8090/hotels', hotelData)
      .then(() => alert("Hotel creado correctamente"))
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Hotel</h2>
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nombre del hotel" />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descripción" />
      <input type="number" value={rooms} onChange={e => setRooms(Number(e.target.value))} placeholder="Cantidad de habitaciones" />

      <h3>Amenities</h3>
      {amenities.map(a => (
        <div key={a.id}>
          <input
            type="checkbox"
            value={a.id}
            onChange={() => handleCheckboxChange(a.id)}
            checked={selectedAmenities.includes(a.id)}
          />
          <label>{a.name}</label>
        </div>
      ))}

      <button type="submit">Crear Hotel</button>
    </form>
  );
};

export default HotelForm;
