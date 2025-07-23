import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './SelectedHotel.module.css';
import MenuBar from '../../Components/MenuBar/MenuBar';
import ReservaCard from '../../Components/ReservaCard/ReservaCard';
import Modal from '../../Components/Modal/Modal'
import { AuthContext } from '../../Context/AuthContext';

function SelectedHotel() {
  const [hotel, setHotel] = useState(null);
  const [dateStart, setDateStart] = useState('');
  const [dateFinish, setDateFinish] = useState('');
  const [persons, setPersons] = useState(1);

  const [reservQuerry, setReservQuerry] = useState(null);

  const [reservStart, setReservStart] = useState(null);
  const [reservFinish, setReservFinish] = useState(null);
  const [reservPeople, setReservPeople] = useState(null);
  const [reservAvaliable, setReservAvaliable] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();


  const today = new Date().toISOString().split('T')[0];




  useEffect(() => {
    const storedHotel = localStorage.getItem('selectedHotel');
    if (storedHotel) {
      setHotel(JSON.parse(storedHotel));
    }
    
  }, []);



  useEffect(() => {
    if (reservQuerry) {
      console.log("Est es resevquerry", reservQuerry)
      setReservStart(reservQuerry.date_start);
      setReservFinish(reservQuerry.date_finish);
      setReservPeople(persons);
      setReservAvaliable(reservQuerry.avaliable);

    }
  }, [reservQuerry]);



  useEffect(() => {
  const reservaGuardada = localStorage.getItem("reservaPendiente");
  if (reservaGuardada) {
    const reserva = JSON.parse(reservaGuardada);
    console.log("Restaurando reserva desde localStorage", reserva);

    setHotel(reserva.hotel);
    setReservStart(reserva.dateStart);
    setReservFinish(reserva.dateFinish);
    setReservPeople(parseInt(reserva.personas, 10));
    setReservAvaliable(true); 

    // Si querés borrar la reserva desde este componente:
    localStorage.removeItem("reservaPendiente");
  }
}, []);



  if (!hotel) return <div>Cargando hotel...</div>;

  const { name, description, imagenes, amenities, id } = hotel;

  const BASE_URL = 'http://localhost:8090';
  const imagenUrl =
    Array.isArray(imagenes) && imagenes.length > 0 && imagenes[0].url
      ? `${BASE_URL}${imagenes[0].url}`
      : '/hotel_default.webp';



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dateStart || !dateFinish || persons <= 0) {
      alert('Por favor completá todos los campos correctamente');
      return;
    }

   const isoDateStart = new Date(`${dateStart}T00:00:00`).toISOString();
const isoDateFinish = new Date(`${dateFinish}T00:00:00`).toISOString();
    
    try {
      const response = await fetch('http://localhost:8090/reserv/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hotel_id: id,
          date_start: isoDateStart,
          date_finish: isoDateFinish,
          personas: parseInt(persons, 10),
        }),
      });

      const reserv = await response.json();
      if (response.ok) {
        setReservQuerry(reserv);
        console.log("esto es a data de reserva", reserv)
      } else {
        alert('Error al obtener la disponibilidad');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Fallo la conexión con el servidor');
    }
  };

  return (
    <div className={styles.selectedhotelcontainer}>
      <MenuBar />
      <div className={styles.selectedhotelcontent}>
     

        <div className={styles.hotelimagesection}>
          <img className={styles.hotelimage} src={imagenUrl} alt={`Imagen de ${name}`} />
        </div>
   <div className={styles.hotelinfosection}>
          <h1 className={styles.hoteltitle}>{name}</h1>
        
       
          <p className={styles.hoteldescription}>{description}</p>

          {Array.isArray(amenities) && amenities.length > 0 && (
            <div className={styles.hotelamenities}>
              <h2>Amenities</h2>
              <ul className={styles.amenitieslist}>
                {amenities.map((amenity, index) => (
                  <li key={amenity.id || index} className={styles.amenityitem}>
                    {amenity.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={styles.searchdisponibilidad}>
          <div>
            <label className={styles.diponibilidadtitle}>Comprobar Disponibilidad: </label>
          </div>
          <form className={styles.filtroForm} onSubmit={handleSubmit}>
            <label>
              Inicio estadía:
              <input type="date" value={dateStart} onChange={(e) => setDateStart(e.target.value)} min={today} />
            </label>

            <label>
              Fin estadía:
              <input
                type="date"
                value={dateFinish}
                onChange={(e) => setDateFinish(e.target.value)}
                min={dateStart}

              />
            </label>

            <label>
              Personas:
              <input
                type="number"
                min="1"
                value={persons}
                onChange={(e) => setPersons(e.target.value)}
              />
            </label>

            <button type="submit">Consultar</button>
          </form>
          <div className={styles.resultado}>
            {reservAvaliable !== null && (

              <div >
                {reservAvaliable ? (

                  <div>
                    <label className={styles.diponibilidSi}>El hotel cuenta con disponibilidad en las fechas seleccionadas! </label>
                    <ReservaCard
                      hotel={hotel}
                      dateStart={reservStart}
                      dateFinish={reservFinish}
                      personas={reservPeople}
                      onReservar={() => {
                        if (user) {
                          navigate("/confirm-reserva", {
                            state: {
                              reserva: {
                                hotel,
                                dateStart: reservStart,
                                dateFinish: reservFinish,
                                personas: reservPeople,
                              }
                            }
                          });
                        } else {
                          const reservaPendiente = {
      hotel,
      dateStart: reservStart,
      dateFinish: reservFinish,
      personas: reservPeople,
    };
    localStorage.setItem("reservaPendiente", JSON.stringify(reservaPendiente));
//muestro modal 
    setShowModal(true);

                        }
                      }}
                    />
                  </div>
                ) : (
                  <div className={styles.diponibilidadNo}>No se cuenta con disponibiliad en esas fechas.... :(,  proba otros hoteles o Fechas  :)</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <Modal
          title="No se encuentra logueado"
          onCancel={() => setShowModal(false)}
          onConfirm={() => navigate("/login", {
            state: { from: location }
          })}
          confirmText="Iniciar Sesión"
          cancelText="Cancelar"
        >
          <p>Necesitás iniciar sesión en nuestra plataforma para poder hacer una reserva!</p>
        </Modal>
      )}

    </div>


  );
}

export default SelectedHotel;
