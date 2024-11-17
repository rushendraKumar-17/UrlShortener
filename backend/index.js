import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import urlRoutes from "./routes/urlRoutes.js";
import connectDB from "./config/connectDB.js";
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

app.listen(port,()=>{
    console.log("Server running at port "+port);
})