import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './componets/NavbarLayout';
import Welcome from './pages/WelcomeScreen';
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import CatageriousPages from './pages/CatageriousPages';
import userDashbaord from './pages/userDashbaord';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Welcome/>}></Route>
      <Route path='welcome' element={<Welcome/>}></Route>
      <Route path='login' element={<LoginPage/>}></Route>
      <Route path='Dashboard' element={<Dashboard/>}></Route>
      <Route path="CatageriousPage/:id" element={<CatageriousPages/>}></Route>
      <Route path="userdashboard" element={<CatageriousPages/>}></Route>


    </Routes>
    </BrowserRouter>  
  );
}

export default App;
