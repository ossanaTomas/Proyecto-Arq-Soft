import { Navigate } from "react-router-dom";
import Bot from "./Boton";

function MenuBar(){
    return(
        <header className="header">
            <div className="MenuBarContent" >
            <h1 className="title">MundoHospedaje</h1>
           <nav className="nav-list">
                    <Bot BotText={"Inciar sesion"} navegar={"/saludo"}/> 
                    <Bot BotText={"Registrarse"} navegar={"/saludo"}/> 
            </nav>
            </div>
        </header>
        
    )   
}

export default MenuBar; 