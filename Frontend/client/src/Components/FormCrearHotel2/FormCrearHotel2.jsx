import React, { useState, useEffect } from "react";
import styles from "./FormCrearHotel2.module.css";
import Bot from '../../Components/Boton/Boton';

async function getamenities() {
    return await fetch('http://localhost:8090/amenities', {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).then(response => response.json());
}


function FormCrearHotel() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [rooms, setRooms] = useState('');
    const [amenities, setAmenities] = useState([]);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [showNewAmenityForm, setShowNewAmenityForm] = useState(false);
    const [newAmenityName, setNewAmenityName] = useState('');
    const [newAmenityDescription, setNewAmenityDescription] = useState('');
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        getamenities().then(setAmenities);
    }, []);

    //Toggle de selección: selecciona o deselecciona
    const toggleAmenity = (id) => {
        setSelectedAmenities(prev =>
            prev.includes(id) ? prev.filter(aid => aid !== id) : [...prev, id]
        );
    };


    // Agregar nueva amenity al backend
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
                setNewAmenityName('');
                setNewAmenityDescription('');
                setSelectedAmenities(prev => [...prev, newAmenity.id]);
                setShowNewAmenityForm(false);
            } else {
                alert("Error al agregar la amenity");
            }
        } catch (err) {
            console.error("Error al agregar amenity:", err);
        }
    };


const resetForm = () => {
  setName('');
  setDescription('');
  setRooms('');
  setSelectedAmenities([]);
  setShowNewAmenityForm(false);
  setNewAmenityName('');
  setNewAmenityDescription('');
  setImageFile(null);
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
        return data.url; // ejemplo: "/uploads/hotels/123.jpg"
    };

      const submit = async (e) => {
        e.preventDefault();

        // 1. Subir imagen si hay
        let imageUrl = '';
        if (imageFile) {
            imageUrl = await handleImageUpload();
        }


        const hotelData = {
            name: name.trim(),
            description: description,
            rooms: Number(rooms),
            amenities: selectedAmenities,
            imagenes: imageUrl ? [{ url: imageUrl }] : []
        };



        try {
            const response = await fetch('http://localhost:8090/hotels', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(hotelData)
            });

            const data = await response.json();

            if (response.ok) {
                alert("Registro exitoso");
                resetForm(); 

            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error al registrar hotel:', error);
            alert('Hubo un problema al registrar el hotel.');
        }
    };

    console.log(selectedAmenities);
    return (
                <div className={styles.form}>
                <form onSubmit={submit} className={styles.regNewUser}>
                    <h1>Inserta nuevo hotel</h1>
                    <input type="text" placeholder="Nombre Hotel" value={name} onChange={e => setName(e.target.value)} required className={styles.input} />
                    <input type="text" placeholder="Descripción"  value={description} onChange={e => setDescription(e.target.value)} required className={styles.input} />
                    <input type="number" placeholder='Cantidad de habitaciones'  value={rooms} onChange={e => setRooms(e.target.value)} required className={styles.input} />

                     {/* input para imagen */}
                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} className={styles.input} />

                    {/* Matriz de opciones */}
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

                        {/* Botón para agregar nueva amenity */}
                        <div className={styles.amenityCard} onClick={() => setShowNewAmenityForm(true)}>
                            <h4>Nueva amenity</h4>
                        </div>
                    </div>

                    {/*  Formulario para nueva amenity */}
                    {showNewAmenityForm && (
                        <div className={styles.newAmenityForm}>
                            <input type="text" placeholder="Nombre de nueva amenity" value={newAmenityName} onChange={e => setNewAmenityName(e.target.value)} />
                            <input type="text" placeholder="Descripción" value={newAmenityDescription} onChange={e => setNewAmenityDescription(e.target.value)} />
                            <button type="button" onClick={addNewAmenity}>Agregar</button>
                            <button type="button" onClick={() => setShowNewAmenityForm(false)}>Cancelar</button>
                        </div>
                    )}
                    <Bot BotText={"Registrar"} type="submit" />
                </form>
            </div>
         
    );
}

export default FormCrearHotel;
