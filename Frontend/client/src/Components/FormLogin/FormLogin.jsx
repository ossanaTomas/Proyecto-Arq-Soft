 import Bot from "../Boton/Boton";
import { useState,useContext} from 'react';
import { AuthContext } from "../../Context/AuthContext";
import styles from "./FormLogin.module.css"
import { useNavigate } from 'react-router-dom'; 


const FormLogin=()=>{
    const [email, setEmail] =  useState('');
    const [password,setPassword] = useState(''); 
    const {login}=useContext(AuthContext); 
    const navigate = useNavigate()
  
    const Submit = async (e) => {
        e.preventDefault();

        const loginData={
            email:email,
            password: password,
        };

        try{
            const response = await fetch('http://localhost:8090/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
               // credentials: 'include',
                body: JSON.stringify(loginData),
                //json.stringify convierte un valor en una cadena de texto con formato JSON 
            });

            const data = await response.json();
            console.log(data); 

            if (response.ok) {
                login({id:data.id,name:data.name,role:data.role},data.token);
                alert(`Inicio Exitoso! Bienvenido ${data.name}!`);
                navigate("/"); 
            } else {
                alert(`Error: ${data.message}`);
            }

        }catch (error) {
            console.error('Error al registrar:', error);
            alert('Hubo un problema al inciar sesion.');
        }
        
    
    }
    

    return (
        <div className={styles.formContainer}>
        <h3>Inicia sesión</h3>
        <h6>¡Puedes iniciar sesión para acceder a nuestros servicios!</h6>
        <form onSubmit={Submit} className={styles.form} >
            <input type="email" id="Email" name="Email" placeholder="Email" onChange={e => setEmail(e.target.value)} required className={styles.input} />
            <input type="password" id="password" name="Pasword" placeholder="Contraseña"  onChange={e => setPassword(e.target.value)} required className={styles.input}/>
            <Bot  BotText={"Ingresar"} type="submit"/>
        </form>
        <div className={styles.ingreso} >
        </div>
          <span className={styles.cuenta}>¿No tenes cuenta?</span>
          <Bot BotText={"Registrarse"} navegar={"/register"} />
        </div>
    )

}; 

export default FormLogin; 