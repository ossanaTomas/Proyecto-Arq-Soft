import React, { useState, useEffect, useRef } from 'react';
import styles from './Administrar.module.css';

import MenuBar from "../../Components/MenuBar/MenuBar";
import Bot from '../../Components/Boton/Boton';
import FormCrearHotel from "../../Components/FormCrearHotel2/FormCrearHotel2"
import AdminSidebar from '../../Components/Slidebar/slidebar'
import CardHotel from '../../Components/CardHotel/CardHotel';
import HotelDetails from '../../Components/HotelDetails/Hoteldetails';
import AmenitiesGestion from '../../Components/AmenitiesGestion/AmenitiesGestion';
import CardUser from '../../Components/CardUser/CardUser';
import Modal from "../../Components/Modal/Modal";
import FormCreateAmeniti from '../../Components/AmenitiesGestion/FormCreateAmeniti';
import Buscador from '../../Components/Buscador/Buscador';

async function getamenities() {
    return await fetch('http://localhost:8090/amenities', {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).then(response => response.json());
}

async function updateAmenity(updatedAmenity) {
    const res = await fetch(`http://localhost:8090/amenities/${updatedAmenity.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAmenity)
    });
    return res.ok;
}

async function deleteAmenity(id) {
    const res = await fetch(`http://localhost:8090/amenities/${id}`, {
        method: "DELETE"
    });
    return res.ok;
}


async function gethotels() {
    return await fetch('http://localhost:8090/hotels', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => response.json());
}

async function getusers() {
    return await fetch('http://localhost:8090/user', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => response.json());
}






function AdminDashboard() {

    const [active, setActive] = useState({ section: 'Hoteles', action: 'Ver todos' });
    const [hotels, setHotels] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState(null)

    const [amenities, setAmenities] = useState([]);
    const [showNewAmeniti, setShowNewAmeniti] = useState(false);
    const [selectedAmenities, setSelectedAmenities] = useState(null);

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const usersContainerRef = useRef(null);
    const [userToUpdateRole, setUserToUpdateRole] = useState(null);
    const [showRoleModal, setShowRoleModal] = useState(false);



    const [showModal, setShowModal] = useState(false);
    const [amenityToDelete, setAmenityToDelete] = useState(null);


    { console.log("Hoteles:", hotels) }
    useEffect(() => {
        if (active.section === 'Hoteles' && active.action === 'Ver todos') {
            gethotels().then(setHotels);
        }
    }, [active]);


    { console.log("Ameniteis:", amenities) }
    useEffect(() => {
        if (active.section === 'Amenities' && active.action === 'Gestionar') {
            getamenities().then(setAmenities);
        }
    }, [active]);

    { console.log("Usuarios:", users) }
    useEffect(() => {
        if (active.section === 'Usuarios' && active.action === 'Ver todos') {
            getusers().then(setUsers);
        }
    }, [active]);


    useEffect(() => {
        const handleClickOutside = (event) => {
            // Si hay un usuario seleccionado y el clic fue fuera del contenedor de usuarios..
            if (
                selectedUser &&
                usersContainerRef.current &&
                !usersContainerRef.current.contains(event.target)
            ) {
                setSelectedUser(null); // Deseleccionamos
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [selectedUser]);



    async function updateUserRole(userId) {
        try {
            const res = await fetch(`http://localhost:8090/user/role/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    // Si usás token:
                    // "Authorization": "Bearer tu_token"
                }
            });

            if (res.ok) {
                const updatedUser = await res.json();
                // Actualizamos lista local de usuarios
                setUsers((prev) =>
                    prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
                );
                setSelectedUser(null);
                window.alert("Modificacion Exitosa!")
            } else {
                console.error("Error al cambiar el rol");
            }
        } catch (error) {
            console.error("Error de red:", error);
        } finally {
            setShowRoleModal(false);
            setUserToUpdateRole(null);
        }
    }







    return (

        <div className={styles.container}>
            <MenuBar />
            <div className={styles.dashboardLayout}>
                {/*dependiendo de la seleccion */}
                <AdminSidebar onSelect={(section, action) => {
                    console.log("Seleccionaste:", section, action);
                    setActive({ section, action })
                    setSelectedHotel(null)
                }} />
              <Buscador></Buscador>
                <div className={styles.dashboardContent} >

                    {/*Es el contenido que se debe renderizar y */}


                    {active.section === 'Amenities' && active.action === 'Gestionar' && showNewAmeniti === false &&
                        <div className={styles.headerRight}>
                            <button className={styles.subimiButton} onClick={() => setShowNewAmeniti(true)}> Crear nueva amenity</button>
                        </div>

                    }

                    {active.section === 'Hoteles' && active.action === 'Agregar nuevo' && <FormCrearHotel />}
                    {active.section === 'Hoteles' && active.action === 'Ver todos y editar' && (
                        selectedHotel ? (
                            <HotelDetails hotel={selectedHotel} onBack={() => setSelectedHotel(null)} />
                        ) : (
                            <div className={styles.hotelGrid}>
                                {hotels.map((hotel) => (
                                    <CardHotel
                                        key={hotel.id}
                                        hotel={hotel}
                                        onClick={() => {
                                            console.log("seleccionaste el hotel", hotel);
                                            setSelectedHotel(hotel);
                                        }}
                                    />
                                ))}
                            </div>
                        )
                    )
                    }

                    {active.section === 'Amenities' && active.action === 'Gestionar' && showNewAmeniti === false && (
                        <>
                            <div className={styles.hotelGrid}>
                                {amenities.map((am) => (
                                    <AmenitiesGestion
                                        key={am.id}
                                        ameniti={am}
                                        isEditing={selectedAmenities?.id === am.id}
                                        onClick={() => setSelectedAmenities(am)}
                                        onSave={async (updatedAmenity) => {
                                            const success = await updateAmenity(updatedAmenity);
                                            if (success) {
                                                const updatedList = amenities.map(a => a.id === updatedAmenity.id ? updatedAmenity : a);
                                                setAmenities(updatedList);
                                                setSelectedAmenities(null);
                                            }
                                        }}
                                        onDelete={() => {
                                            setShowModal(true);
                                            setAmenityToDelete(am);
                                        }}
                                        onCancel={() => setSelectedAmenities(null)}
                                    />
                                ))}
                            </div>

                            {showModal && amenityToDelete && (
                                <Modal
                                    title={`¿Eliminar "${amenityToDelete.name}"?`}
                                    onConfirm={async () => {
                                        const success = await deleteAmenity(amenityToDelete.id);
                                        if (success) {
                                            setAmenities(amenities.filter(a => a.id !== amenityToDelete.id));
                                            setSelectedAmenities(null);
                                            setShowModal(false);
                                            setAmenityToDelete(null);
                                        }
                                    }}
                                    onCancel={() => {
                                        setShowModal(false);
                                        setAmenityToDelete(null);
                                    }}
                                >
                                    Esta acción no se puede deshacer.
                                </Modal>
                            )}
                        </>
                    )}
                    {showNewAmeniti && (
                        <FormCreateAmeniti
                            onClose={() => setShowNewAmeniti(false)}
                            onCreated={(newAmenity) => {
                                setAmenities(prev => [...prev, newAmenity]);
                                setShowNewAmeniti(false);
                            }}
                        />
                    )}
                    {active.section === 'Usuarios' && active.action === 'Ver todos' &&

                        <div className={styles.hotelGrid} >
                            {users.map((user) => (
                                <CardUser
                                    user={user}
                                    moreInfo={selectedUser?.id === user.id}
                                    onClick={() => setSelectedUser(user)}
                                    onRequestRoleChange={(u) => {
                                        setUserToUpdateRole(u);
                                        setShowRoleModal(true);
                                    }}
                                />
                            ))}
                        </div>
                    }
                    {showRoleModal && userToUpdateRole && (
                        <Modal
                            title="Advertencia"
                            onConfirm={() => updateUserRole(userToUpdateRole.id)}
                            onCancel={() => {
                                setShowRoleModal(false);
                                setUserToUpdateRole(null);
                            }}
                            confirmText="Confirmar"
                            cancelText="Cancelar"
                        >
                            Está cambiando el rol del usuario <strong>{userToUpdateRole.name}</strong>.
                            ¿Desea continuar?
                        </Modal>
                    )}


                </div>
            </div>

        </div>

    );
}

export default AdminDashboard;




