 import Bot from "./Boton";
import { useState} from 'react';


const Loginlogic=()=>{
    const [email, setEmail] =  useState('');
    const [password,setPassword] = useState(''); 
  
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
                alert("Registro exitoso. Redirigiendo...");
            
            } else {
                alert(`Error: ${data.message}`);
            }

        }catch (error) {
            console.error('Error al registrar:', error);
            alert('Hubo un problema al registrar el usuario.');
        }
        
    
    }
    

    return (
        <div>
        <h3>Inicia sesión</h3>
        <h6>Puedes iniciar sesión con tu cuenta MundoHospedaje.com para acceder a nuestros servicios</h6>
        <form onSubmit={Submit} >
            <input type="email" id="Email" name="Email" placeholder="Email" onChange={e => setEmail(e.target.value)} required  />
            <input type="password" id="password" name="Pasword" placeholder="Contraseña"  onChange={e => setPassword(e.target.value)} required />
            <Bot  type="submit" BotText={"Ingresar"} />
        </form>
        </div>
    )

}; 

export default Loginlogic ; 