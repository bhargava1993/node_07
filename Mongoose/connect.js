const mongoose = require("mongoose");

const URi = "mongodb://127.0.0.1:27017";

const db = "collegeDb";

// 1. connect to mongoDb

async function main(){
    try{

        await mongoose.connect(`${URi}/${db}`);
        // await mongoose.connect("mongodb://127.0.0.1:27017/collegeDb")

        console.log("Mongodb connected successfully");


        // 2. define a schema

        const studentSchema = new mongoose.Schema({
            name: {
                type:String,
                required: true,
                trim: true
            },
            age:{
                type: Number,
                required: true,
                min:1
            },
            email:{
                type: String,
                required: true,
                lowercase: true,
                unique: true
            },
            marks:{
                type: Number,
                default: 0,
                min:0,
                max:100
            }
        });

        // 3. create a model

        const StudentTable = mongoose.model("Student", studentSchema);

        // 4.Create: Insert a student

        // const newStudent = await StudentTable.create({
        //     name:"Ravi",
        //     age:21,
        //     email: "Ravi@example.com",
        //     marks:85
        // });

        const newStudent = await StudentTable.create({
          
            age:"21",
            email: "koushik@example.com",
            marks:"85",
            degree: "MCA"
        });

        console.log("newStudent----",newStudent)

        // 5. Read. find all students
        // const students = await StudentTable.find();
        // console.log("students----",students)

        // const student = await StudentTable.findOne({email:"deepika@example.com"});
        // console.log("student----",student)


    }catch(error){
        console.log("connectio error:",error)

    }finally{
        await mongoose.disconnect();
    }
}

 main();