// src/Components/FiltroHotels/FiltroHotels.jsx
import React, { useState } from 'react';
import styles from './FilterHotels.module.css';

function FiltroHotels({ onFiltrar }) {
  const [dateStart, setDateStart] = useState('');
  const [dateFinish, setDateFinish] = useState('');
  const [personas, setPersonas] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("dates:", dateFinish, "date2:",dateStart)
    // Validación básica
    if (!dateStart || !dateFinish || personas <= 0) {
      alert("Por favor completá todos los campos correctamente");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8090/reserv/disponibility?date_start=${dateStart}&date_finish=${dateFinish}&personas=${personas}`);
      const data = await response.json();
      onFiltrar(data); // Actualiza los hoteles en el padre
    } catch (error) {
      console.error("Error al filtrar hoteles:", error);
    }
  };

  return (
    <form className={styles.filtroForm} onSubmit={handleSubmit}>
      <label>
         Inicio estadia:
        <input type="date" value={dateStart} onChange={(e) => setDateStart(e.target.value)} />
      </label>

      <label>
         Fin estadia:
        <input type="date" value={dateFinish} onChange={(e) => setDateFinish(e.target.value)} min={dateStart}/>
      </label>

      <label>
        Personas:
        <input type="number" min="1" value={personas} onChange={(e) => setPersonas(e.target.value)} />
      </label>

      <button type="submit">Buscar Hoteles</button>
    </form>
  );
}

export default FiltroHotels;
