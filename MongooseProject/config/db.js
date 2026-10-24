const mongoose = require("mongoose");

// 1. connect to mongoDb

const connectDB = async () => {
    try {

        const URi = process.env.MONGO_URI;

        const db = process.env.db;
        await mongoose.connect(`${URi}/${db}`);
        // await mongoose.connect("mongodb://127.0.0.1:27017/collegeDb")

        console.log("Mongodb connected successfully");

    } catch (error) {
        console.log("connectio error:", error)

    } finally {
        // await mongoose.disconnect();
    }
}

module.exports = connectDB;