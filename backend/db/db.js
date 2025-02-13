import mongoose from "mongoose"

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Mongodb Connected Sucessfully!!!");
    } catch (error) {
        console.error(`Mongodb Connection Error: ${error}`);
    }
}

export default connectDB;