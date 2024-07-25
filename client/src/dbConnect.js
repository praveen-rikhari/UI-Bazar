import mongoose from "mongoose";

function dbConnect(){
    try {
        mongoose.connect("mongodb://127.0.0.1:27017/clerkInngest")
    } catch (error) {
        console.log(error);
    }
}

export default dbConnect;