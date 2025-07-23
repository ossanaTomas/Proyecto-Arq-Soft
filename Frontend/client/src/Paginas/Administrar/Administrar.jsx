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

async function getAmenities() {
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
    const [showSearchBar, setshowSearchBar] = useState(true);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');


    useEffect(() => {
        if (active.section === 'Hoteles' && active.action.includes('Ver')) {
            gethotels().then(setHotels);
        }
    }, [active]);

    // este solo para vizualizar 
    useEffect(() => {
        console.log(selectedAmenities)
    }, [selectedAmenities]);


    useEffect(() => {
        if (active.section === 'Amenities' && active.action === 'Gestionar' ) {
            getAmenities().then(setAmenities);
        }
    }, [active]);

    useEffect(() => {
        if (active.section === 'Usuarios' && active.action.includes('Ver')) {
            getusers().then(setUsers);
        }
    }, [active]);

    useEffect(() => {
        if (selectedHotel || active.action === 'Agregar nuevo') {
            setshowSearchBar(false);
        } else {
            setshowSearchBar(true);
        }
    }, [selectedHotel, active]);

    //esto no esta andando
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectedUser && usersContainerRef.current && !usersContainerRef.current.contains(event.target)) {
                setSelectedUser(null);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [selectedUser]);


    async function updateUserRole(userId) {
        try {
            const res = await fetch(`http://localhost:8090/user/role/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" }
            });

            if (res.ok) {
                const updatedUser = await res.json();
                setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
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

    //defino un elemento render, que va a contener todos los hoteles, usuarios, amenities etc a renderizar
    let renderedData = [];

    // dependiendoi de la seccion que esta activa, es lo que mostramos
    if (active.section === 'Hoteles' && active.action.includes('Ver')) {
        //render en esta seccion son los datos de los hoteles, para luego mutarlos con filter y sort
        renderedData = [...hotels]
            //h es cada hotel del array
            .filter(h => h.name.toLowerCase().includes(searchTerm.toLowerCase())) //buscamos si el nombre incluye el termino ingresado
            .sort((a, b) => {
                if (sortOption === 'nombre_asc') return a.name.localeCompare(b.name);
                if (sortOption === 'nombre_desc') return b.name.localeCompare(a.name);
                return 0;
            });

    }
    if (active.section === 'Usuarios' && active.action.includes('Ver')) {
        renderedData = [...users]
            .filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => {
                if (sortOption === 'nombre_asc') return a.name.localeCompare(b.name);
                if (sortOption === 'nombre_desc') return b.name.localeCompare(a.name);
                return 0;
            });
    }
    if (active.section === 'Amenities' && active.action === 'Gestionar') {
        renderedData = [...amenities]
            .filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => {
                if (sortOption === 'nombre_asc') return a.name.localeCompare(b.name);
                if (sortOption === 'nombre_desc') return b.name.localeCompare(a.name);
                return 0;
            });
    }

    return (
        <div className={styles.container}>
            <MenuBar />

            {showSearchBar === true &&
                <div className={styles.searchBarWrapper}>
                    <Buscador
                        onSearchChange={setSearchTerm}
                        onSortChange={setSortOption}
                    />
                </div>}
            <div className={styles.dashboardLayout}>
                <AdminSidebar onSelect={(section, action) => {
                    setActive({ section, action });
                    setSelectedHotel(null);
                }} />



                <div className={styles.dashboardContent}>
                    <div className={styles.mainContent}>

                        {active.section === 'Hoteles' && active.action === 'Agregar nuevo' && <FormCrearHotel />}
                        {active.section === 'Hoteles' && active.action.includes('Ver') && (
                            selectedHotel ? (

                                <HotelDetails hotel={selectedHotel} onBack={() => setSelectedHotel(null)} />
                            ) : (
                                <div className={styles.hotelGrid}>
                                    {renderedData.map((hotel) => (
                                        <CardHotel
                                            key={hotel.id}
                                            hotel={hotel}
                                            onClick={() => setSelectedHotel(hotel)}
                                        />
                                    ))}
                                </div>
                            )
                        )}

                        {active.section === 'Amenities' && active.action === 'Gestionar' && showNewAmeniti === false && (
                            <div className={styles.headerRight}>
                                <button className={styles.subimiButton} onClick={() => setShowNewAmeniti(true)}>
                                    Crear nueva amenity
                                </button>
                            </div>
                        )}

                        {active.section === 'Amenities' && active.action === 'Gestionar' && showNewAmeniti === false && (
                            <>
                                <div className={styles.hotelGrid}>
                                    {renderedData.map((am) => (
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
                                    getAmenities().then(setAmenities);

                                }}
                            />
                        )}

                        {active.section === 'Usuarios' && active.action === 'Ver todos' && (
                            <div className={styles.hotelGrid}>
                                {renderedData.map((user) => (
                                    <CardUser
                                        key={user.id}
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
                        )}

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
                                Está cambiando el rol del usuario <strong>{userToUpdateRole.name}</strong>. ¿Desea continuar?
                            </Modal>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
