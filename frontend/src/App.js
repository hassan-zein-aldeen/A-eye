import './reset.css';
import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/login';
import Admin from './pages/Admin';
import User from './pages/User';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Home' element={<Home />} />
        <Route path='/' element={<Home />} />
        <Route path='Login' element={<Login />} />
        <Route path='/Admin' element={<Admin />} />
        <Route path='/User' element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
