import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register'
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import MainPage from './pages/MainPage';
import LogoImg from './photos/logo192.png'

function App() {

  return (
    <Router>
      <div>
      <header>
          <nav className='navbar'>
            <div className='container-fluid row'>
              <Link to="/" className='titulo col-3'>
              <img src={LogoImg}
              alt='logo' className='logo'
              height={70} width={70}></img>
              </Link>
              
              <div className='col-1'></div>

              <Link to="/" className='col-2 text-end link-txt'>Inicio</Link>
              <Link to="/register" className='col-2 text-end link-txt'>Regístrate</Link>
              <Link to="/login" className='col-2 text-end link-txt'>Login</Link>
              <Link to="/main" className='col-2 text-end link-txt'>Main</Link>
            </div>
              
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path='/main' element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App; 
