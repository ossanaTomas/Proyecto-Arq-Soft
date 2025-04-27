
import './Styles/App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from "./Paginas/Home.jsx"
import Login from './Paginas/Login.jsx';
import Register from './Paginas/Register.jsx'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />

          <Route path='/saludo' element={<h1>Chau mundo</h1>} />
          <Route path='/*' element={ <h1>Error 404</h1> /*<Navigate to='/' />*/} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
