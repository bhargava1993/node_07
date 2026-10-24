const mongoose = require("mongoose");
const Student = require("../models/Student");

// create student
const createStudent = async (req, res, next)=>{

    try{
        console.log("createStudent req.body:", req.body)
        const createStudent = await Student.create(req.body);

        res.status(201).json({
            success: true,
            message: "Student created successfully",
            data:createStudent
        })

    }catch(error){
        console.log("createStudent function error:",createStudent)
        next(error);
    }

}

const getAllStudents = async (req, res)=>{

}

const getStudentById = async (req, res)=>{

}

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById

}