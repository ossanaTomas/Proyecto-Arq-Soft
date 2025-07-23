
//import './Styles/App.css';
//import './Styles/formLogin.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from "./Paginas/Home/Home.jsx"
import Login from './Paginas/Login/Login.jsx';
import Register from './Paginas/Register/Register.jsx'
import InsertarHotels from './Paginas/Administrar/Administrar.jsx';
import SelectedHotel from './Paginas/SelectedHotel/SelectedHotel.jsx';
import ConfirmReserva from './Paginas/Confirm Reserv/ConfirmReserva.jsx';
import MisReservas from './Paginas/MisRerservas/MisReservas.jsx';
import './Styles/global.css';
import './Styles/variables.css';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/hoteles/insertar' element={<InsertarHotels/>} />
          <Route path='/hotel/reservar' element={<SelectedHotel/>}  />
          <Route path='/confirm-reserva' element={<ConfirmReserva/>}/>
          <Route path='/my/reservas'element={<MisReservas/>}/>
          <Route path='/*' element={ <h1>Error 404 - Hotel: Aqui no es :(</h1> /*<Navigate to='/' />*/} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

/*</Routes> <Route path='/hoteles/insertar' element={</>}*/