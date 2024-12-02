import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../Context/context.jsx';
const Allurls = () => {
  const {user} = useContext(AppContext)
  const urls = user?.urls;
  console.log(user);
  console.log(user);
  return (
    <div style={{padding:"10vw"}}>
     { urls && 
        urls.map(url=>{
          return (
            <div style={{display:"flex",gap:"5vw",border:"1px solid black",width:"50vw",height:"10vh",padding:"2vw"}} key={url._id}>
              <p>{url.title}</p>
              <p>{url.targetUrl}</p>
              <p>{url.shortUrl}</p>
            </div>
          )
        })
      
    } 
      
    </div>
  )
}

export default Allurls
