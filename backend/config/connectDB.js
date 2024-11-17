import mongoose from "mongoose";

const connectDB = () => {
    mongoose.connect("mongodb://localhost:27017/UrlShortener").then(()=>{
        console.log("Connected to database");
    }).catch(e => console.log(e))
}
export default connectDB;