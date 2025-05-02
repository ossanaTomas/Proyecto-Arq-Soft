//home.jsx
import React from 'react';
import { useState, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useContext } from 'react';
import Bot from '../../Components/Boton/Boton';
import MenuBar from '../../Components/MenuBar/MenuBar';
import styles from './Home.module.css'


const GetUsers = () => {
    const [users, setUsers] = useState([0]);

    useEffect(() => {
        fetch(("http://localhost:8090/user"))
            .then((response) => response.json())
            .then((users) => setUsers(users))
            .catch((error) => console.error("Error al obtener los datos:", error));

    }, []);

    if (!users) return <p>Cargando usuario...</p>;

    return (
        <div>
            <h1>Lista de Usuarios</h1>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        {user.name}{"  "}
                        {user.last_name}{"  -Email:"}  
                        {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};



function Home() {
    const { user, logout } = useContext(AuthContext);

    const renderAuthOptions = () => {
        if (user) {
            return (
                //cuando haga clik en hola user que haga otra cosa 
                <>
                <Bot BotText={`Hola ${user.name}`}/>
                <Bot BotText={"Cerrar sesión"}  onClick={logout}/>
                </>
            );
        }
        return (
            <>
                <Bot BotText={"Iniciar sesión"} navegar={"/Login"} />
                <Bot BotText={"Registrarse"} navegar={"/register"} />
            </>
        );
    };

    return (
        <div className={styles.contenedor}>
            <MenuBar>
                {renderAuthOptions()} {/* ACÁ usás la función */}
            </MenuBar>
            <div className={styles.main}>
                <GetUsers />
            </div>
        </div>
    );
}


export default Home;