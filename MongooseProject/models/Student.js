const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Student name is required"],
        trim: true
    },
    age: {
        type: Number,
        required: [true, "Age name is required"],
        min: [1, "Age is must be at least 1"],
        max: [50, "Age is cannot exceed 50"]
    },
    email: {
        type: String,
        required: [true, "Email name is required"],
        lowercase: true,
        unique: true
    },
    marks: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    course:{
        type: [String],
        default: []
    }

}, {
    timestamps: true
});


module.exports = mongoose.model("Student", studentSchema);