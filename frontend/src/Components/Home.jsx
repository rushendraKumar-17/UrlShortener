/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar';
import { Route, Routes } from 'react-router-dom';
import NewUrl from './NewUrl';
import Allurls from './Allurls';
import Qrcodes from './Qrcodes';
import Navbar from './Navbar';
const Home = () => {
  const [baseUrl,setBaseUrl] = useState();
  const token = localStorage.getItem("token");
  const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post("http://localhost:8000/api/url",{
      url:baseUrl
    },{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then(res=>{
      console.log(res);
      alert(res.data.shortUrl);
    }).catch(e=>{
      console.log(e);
    })
  }
  return (
    <div>
        <Navbar />
        <Sidebar />
        {/* <Routes>
          <Route path='/new' element={<NewUrl />} />
          <Route path='/urls' element={<Allurls />} />
          <Route path='/qrcodes' element={<Qrcodes />} />
        </Routes> */}
        <form action="" onSubmit={handleSubmit}>
          <input type="text" name="baseUrl" id="baseUrl" onChange={(e)=> setBaseUrl(e.target.value)}/> 
          <button type="submit">Submit</button> 
        </form>   
    </div>
  )
}

export default Home
