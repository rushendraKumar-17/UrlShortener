import React, { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import NewUrl from "./NewUrl";
import Allurls from "./Allurls";
import Qrcodes from "./Qrcodes";
import Landing from "./Landing.jsx";
import NewComponent from "./NewComponent.jsx";
import NewQr from "./NewQr.jsx";
import AppContext from "../Context/context.jsx";
const Home = () => {
  const [baseUrl, setBaseUrl] = useState("");
  const token = localStorage.getItem("token");

  const {apiUrl} = useContext(AppContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${apiUrl}/api/url`,
        { url: baseUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        alert(res.data.shortUrl);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="new/*" element={<NewComponent />} />
          {/* <Route path="new" element={<NewUrl />} />
          <Route path="new/newqr" element={<NewQr />} /> */}
          <Route path="urls" element={<Allurls />} />
          <Route path="qrcodes" element={<Qrcodes />} />
        </Routes>
    </div>
  );
};

export default Home;
