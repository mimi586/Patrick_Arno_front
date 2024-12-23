import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Impots from "./Components/Impots";
import User from "./Components/user";
import Login from "./Components/login";
import Rapport from "./Components/rapport";
import Home from "../home";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'; // Assurez-vous de configurer les styles globaux ici

function App() {
  return (
    <Router>
      <Routes>
        {/* Render Login separately without the dashboard layout */}
        <Route path="/login" element={<Login />} />
        
        {/* Routes with the dashboard layout */}
        <Route 
          path="*" 
          element={
            <div className="dashboard">
              <Sidebar />
              <div className="dashboard-content">
                <Routes>
                  <Route path="/" element={<Home />} />  {/* Default or home page */}
                  <Route path="/user" element={<User />} />
                  <Route path="/impots" element={<Impots />} />
                  <Route path="/rapport" element={<Rapport />} />
                </Routes>
              </div>
            </div>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
