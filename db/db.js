import mongoose from "mongoose";

const connectToDb = async () => {
    const db = mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("DB connected successfully!!"))
        .catch((err) => console.log("Error connecting with DB", err))
}

export default connectToDb;