// import colors from "colors"
import mongoose from "mongoose"

const connectDB = async () => {
    try {
        mongoose.connect("mongodb+srv://RealEstate:RealEstate@realestate.n8dpbzv.mongodb.net/Auth?retryWrites=true&w=majority&appName=RealEstate").then(()=>{
            console.log("Database connected seccessfully")
        }).catch((error)=>{
            console.log(`MongoDB connection failed: ${error}`);
        })
    } catch (error) {
        console.log(`Error in MongoDB: ${error}`);
    }
}

export default connectDB