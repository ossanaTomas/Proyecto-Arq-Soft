
import './Styles/App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Inicio from "./Paginas/Inicio.jsx"


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/inicio' element={<Inicio/>} />
          <Route path='/saludo' element={<h1>Chau mundo</h1>} />
          <Route path='/*' element={ <h1>Error 404</h1> /*<Navigate to='/' />*/} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
