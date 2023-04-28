import './reset.css';
import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/login';
import AddUser from './pages/AddUser';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Home' element={<Home />} />
        <Route path='/' element={<Home />} />
        <Route path='Login' element={<Login />} />
        <Route path='/AddUser' element={<AddUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
