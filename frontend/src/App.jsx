import { useEffect, useState, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "./Components/Login.jsx";
import Signup from "./Components/Signup.jsx";
import Home from "./Components/Home.jsx";
import AppContext from "./Context/context.jsx";
import Navbar from "./Components/Navbar.jsx";
function App() {
  const navigate = useNavigate();
  const { setUser ,setLogged} = useContext(AppContext);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("https://urlshortener-p7ma.onrender.com/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setUser(res.data);
            setLogged(true);
          } 
          navigate("/home");
        })
        .catch(() => {
          navigate("/login");
        });
    } else {
      navigate("/home");
    }
  }, []);

  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home/*" element={<Home />} /> {/* Nested routes */}
      
    </Routes>
    </>
  );
}

export default App;
