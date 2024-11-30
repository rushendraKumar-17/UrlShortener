import React, { useState } from 'react'
import axios from "axios";
const NewUrl = () => {
  const token = localStorage.getItem("token");
  const [url,setUrl] = useState();
  const [title,setTitle] = useState();
  const handleSubmit = (e)=>{
    e.preventDefault();
    const data = {
      url:url,
      title:title
    }
    console.log(data);
    console.log(token);
    axios.post("http://localhost:8000/api/url",data,{
      headers:{
      Authorization:`Bearer ${token}`
      }
    }).then(res => {
      if(res.status === 200){
        setUrl("");
        setTitle("");
        alert("Your short url is :"+res.data.shortUrl);
      }
    }).catch(e=>console.log(e));
  }
  return (
    <div>
      Create a link
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        Destination url
        <br />
        <input type="text" name='url' onChange={(e)=> setUrl(e.target.value)} value={url}/>
        <br />
        <br />
        Title(optional)
        <br />
        <input type="text" name='title' onChange={(e)=> setTitle(e.target.value)} value={title}/>
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default NewUrl
