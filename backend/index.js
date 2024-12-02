import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import urlRoutes from "./routes/urlRoutes.js";
import connectDB from "./config/connectDB.js";
import urlModel from "./models/urlModel.js";
import userModel from "./models/userModel.js";
import tokenValidation from "./middleware/tokenValidation.js";
import qrcode from "qrcode"
const app = express();
connectDB();
app.use(cors());
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(204); // No Content
  } else {
    next();
  }
});
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Working");
});
const port = 8000;
app.use("/api/users", userRoutes);
app.use("/api/url",urlRoutes);
app.get("/:shortUrl", async (req, res) => {
  try {
    const { shortUrl } = req.params;
    console.log("Received short URL:", shortUrl);  
    
    const urlRecord = await urlModel.findOne({ shortUrl });
    if(!urlRecord){
      return res.status(404).json({ message: "Short URL not found" });
    }
    const userRecord = await userModel.findById(urlRecord.owner);
    const userUrl = userRecord.urls.find((u) => u.shortUrl === shortUrl);
    if (!urlRecord) {
      return res.status(404).json({ message: "Short URL not found" });
    }
    userUrl.visitHistory.push( Date.now() );
    await userRecord.save();
    console.log("Saving the visit");
    res.redirect(urlRecord.targetUrl);
  } catch (error) {
    console.error("Error in redirecting:", error);
    res.status(500).json({ message: "Server error" });
  }
});
app.post("/qr",tokenValidation,(req,res)=>{
  const link = req.body.url;
  qrcode.toDataURL(link,(err,src)=>{
    if(err){
      console.log(err);
      res.send("Error generating QR Code");
    }
    const user = req.user;
    console.log(user);
    res.send(src);
  })
})
app.listen(port,()=>{
    console.log("Server running at port "+port);
})