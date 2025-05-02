import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './Context/AuthContext';


//De cierta manera este codigo es como el analogo a lo que es el main en otros lenguajes 
//reliza la importacion de react y dom para manejar renderizaciones
// importa los estilos. 
// El DOM(Document model Objet)  funciona creando como si fuera un arbol de paginas web. 

// En este caso, el siguiente codigo declara el punto de entrada desde el cual se monta la 
// aplicacion en el DOM. 


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
// El componente app, representaria toda la aplicacion. 


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
