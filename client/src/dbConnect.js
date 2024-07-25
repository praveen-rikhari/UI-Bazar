import mongoose from "mongoose";

function dbConnect(){
    try {
        mongoose.connect(process.env.MONGO_URL)
    } catch (error) {
        console.log(error);
    }
}

export default dbConnect;