import mongoose from "mongoose";

const connectDB = () => {
    mongoose.connect("mongodb+srv://rushi17092004:rushi123@cluster0.4bc8xaq.mongodb.net/UrlShortener").then(()=>{
        console.log("Connected to database");
    }).catch(e => console.log(e))
}
export default connectDB;