import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./MisRerservas.module.css";
import MenuBar from "../../Components/MenuBar/MenuBar";
import InfoReservaCard from "../../Components/InfoReservaCard/InfoRerservaCard";
import Modal from "../../Components/Modal/Modal";
import Bot from "../../Components/Boton/Boton";
import { AuthContext } from "../../Context/AuthContext";




async function  getReservByUserID(id) {
    return await fetch(`http://localhost:8090/reserv/future/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => response.json());
}

async function deleteReserv(id) {
    const res = await fetch(`http://localhost:8090/reserv/${id}`, {
        method: "DELETE"
    });
    return res.ok;
}



function MisRerservas() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState(null);

    const [reservs, setReservs] = useState([]);
    const [selectReserv, setSelectReserv] = useState([]);
    const [reservToDelete, setReservToDelete] = useState(null);
    const [showDeleteReservModal, setShowDeleteReservModal] = useState(false);


useEffect(() => {
    if (user?.id) {
        getReservByUserID(user.id).then(setReservs);
    }
}, [user]);

    return (
        <div className={styles.container}>
            <MenuBar ><Bot BotText={"Volver"} navegar={'/'} /></MenuBar>
            <div className={styles.dashboardContent}>
                <div className={styles.hotelGrid}>
                    {reservs.map((reserv) => (
                        <InfoReservaCard
                            key={reserv.id} // Asegúrate de que sea 'id', no 'Id' si estás usando camelCase
                            reserva={reserv}
                            moreInfo={selectReserv?.id === reserv.id}
                            onEdit={() => setSelectReserv(reserv)}
                            onDelete={() => {
                                setShowDeleteReservModal(true);
                                setReservToDelete(reserv);
                            }}
                        />
                    ))}

                </div>

            </div>
            {showDeleteReservModal && reservToDelete && (
                <Modal
                    title="Advertencia: Eliminara una reserva!!"
                    onConfirm={async () => {
                        const success = await deleteReserv(reservToDelete.id);
                        if (success) {

                            setReservs(prev => prev.filter(r => r.id !== reservToDelete.id));
                            setReservToDelete(null);
                            setShowDeleteReservModal(false);
                            window.alert("Reserva Eliminada con exito")
                        }
                    }}
                    onCancel={() => {
                        setShowDeleteReservModal(false);
                        setReservToDelete(null);
                    }}
                    confirmText="Confirmar"
                    cancelText="Cancelar"
                >
                    Está a punto de eliminar la reserva <strong>¿Seguro desea continuar?</strong>.
                </Modal>
            )}
        </div>
    );
}

export default MisRerservas;