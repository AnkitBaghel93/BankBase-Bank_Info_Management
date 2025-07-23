import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import AddDetails from './components/addDetails/AddDetails';
import ViewDetails from './components/viewDetails/ViewDetails';
import Dashboard from './components/admin/Dashboard';

function App() {
  return (
    <Router>

  <Navbar/>

  <Routes>
   <Route path="/" element={<Home />} />
   {/* <Route path="/about" element={<About />} />
   <Route path="/contact" element={<Contact />} /> */}
   <Route path="/login" element={<Login />} />
   <Route path="/register" element={<Register />} />
   <Route path="/add-details" element={<AddDetails />} />
   <Route path="/view-details" element={<ViewDetails />} />
   <Route path="/admin-dashboard" element={<Dashboard />} />

  </Routes>

    </Router>
  );
}

export default App;
