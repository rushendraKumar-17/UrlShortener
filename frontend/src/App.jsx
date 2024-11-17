/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Home from "./Components/Home.jsx";
import Login from "./Components/Login.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Signup from "./Components/Signup.jsx";
import Navbar from "./Components/Navbar.jsx";
function App() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:8000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          if(res.status === 200){
            navigate('/home');
          }else{
            navigate('/login');
          }
        }).catch(e => {
          console.log(e)
          navigate('/login');
        
        });
    }
    else{
      navigate("/login");
    }
  },[]);

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element = {<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </>
  );
}

export default App;