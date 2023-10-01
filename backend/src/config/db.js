import mongoose from "mongoose";

async function connectToDB() {
    try {
        await mongoose.connect(process.env.URL);
        console.log("Connected DB");
    } catch (err) {
        console.error("Cannot connect to DB \n", err);
    }
}

export { connectToDB };
