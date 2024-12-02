/* eslint-disable no-unused-vars */
import { useEffect, useState,useContext } from "react";
import Home from "./Components/Home.jsx";
import Login from "./Components/Login.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Signup from "./Components/Signup.jsx";
import Navbar from "./Components/Navbar.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import AppContext from "./Context/context.jsx";
function App() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const {user,setUser} = useContext(AppContext);
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
          console.log(res);
          if(res.status === 200){
            navigate('/home');
            setUser(res.data);
            console.log(user);
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
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element = {<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </>
  );
}

export default App;