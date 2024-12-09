import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import urlRoutes from "./routes/urlRoutes.js";
import connectDB from "./config/connectDB.js";
import urlModel from "./models/urlModel.js";
import userModel from "./models/userModel.js";
import tokenValidation from "./middleware/tokenValidation.js";
import qrRoutes from "./routes/qrRoutes.js"

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
app.use("/api/qr",qrRoutes);
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
app.listen(port,()=>{
    console.log("Server running at port "+port);
})