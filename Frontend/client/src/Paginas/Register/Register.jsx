import React, { useState } from 'react';
import Bot from '../../Components/Boton/Boton';
import { useNavigate } from 'react-router-dom';
import styles from "./Register.module.css"
import MenuBar from '../../Components/MenuBar/MenuBar';

const Register = () => {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [last_name, setLasname] = useState('');
    const [email, setEmail] = useState('');
    const [user_Name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [street, setStreeet] = useState('');
    const [number, setNumber] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    //async convierte una función en asíncrona y devuelve una promesa.

    const submit = async (e) => {
        e.preventDefault();

        const userData = {
            name: name.trim(),
            last_name: last_name,
            user_Name: user_Name,
            password: password,
            email: email.toLowerCase(),
            Adress: {
                Street: street.trim(),
                Number: parseInt(number, 10) || 0, 
                City: city.trim(),
                Country: country.trim(),
              },
        };


        try {
            //await detiene la ejecucion hasta que la promesa se resuelve
            const response = await fetch('http://localhost:8090/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                //credentials: 'include',
                body: JSON.stringify(userData),
                //json.stringify convierte un valor en una cadena de texto con formato JSON 
            });

            const data = await response.json();


            //MEJORAR REDIRECCION AL INGRESAR USUARIO
            if (response.ok) {
                alert("Registro exitoso. Redirigiendo...");
                navigate('/');
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error al registrar:', error);
            alert('Hubo un problema al registrar el usuario.');
        }
    };

    console.log({
        name,
        last_name,
        email,
        user_Name,
        street,
        number, 
        city, 
        country,
    })


return (
     <div className={styles.container}>
     <MenuBar/>
     <main className={styles.main}>
        <form onSubmit={submit} className={styles.regNewUser}>
            <h1>Registrarse</h1>
            <input type="Text" placeholder="Nombre" onChange={e => setName(e.target.value)} required  className={styles.input}/>
            <input type="Text" placeholder="Apellido" onChange={e => setLasname(e.target.value)} required  className={styles.input}/>
            <input type="Email" placeholder="Email" onChange={e => setEmail(e.target.value)} required className={styles.input} />
            <input type="Text" placeholder="Nombre usuario" onChange={e => setUsername(e.target.value)} required className={styles.input} />
            <input type="Password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} required  className={styles.input}/>
            <input type="Text" placeholder="Calle" onChange={e => setStreeet(e.target.value)} required className={styles.input} />
            <input type="Number" placeholder="Numero" onChange={e => setNumber(e.target.value)} required className={styles.input} />
            <input type="Text" placeholder="Ciudad" onChange={e => setCity(e.target.value)} required  className={styles.input}/>
            <input type="Text" placeholder="Pais" onChange={e => setCountry(e.target.value)} required className={styles.input}/>
            <Bot BotText={"Registrar"} type="submit"></Bot>
        </form>
        </main>

     </div>
    
    //onchange es un manejador de eventos de react, activado cuando cambia su input
    //{} indican que dentro de onChange se evalua codigo Javascript
    //e => setLastname(e.target.value), funcion flacha que recibe un evento como parametro  y ejecuta setLastName...
    //e.target referencia al elemento html que disparo el evento, en este caso un imput 
    //e.target.value obtiene el valor actual del campo de entrada. 

); 

}


export default Register;