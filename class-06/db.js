
const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri);

async function connection() {

    try {
        await client.connect();
        console.log("Mongodb connected");
        const db = client.db("companydb");
        console.log("db connected", db.databaseName);

        const employees = db.collection("employees");

        // const insertResult = await employees.insertOne({
        //     name: "venu",
        //     department: "Accounts",
        //     salary: 35000,
        //     age: 31
        // })
        // console.log("insert id:", insertResult);


        // const multipleEntries = await employees.insertMany([
        //     {
        //         name: "sudheer",
        //         department: "IT",
        //         salary: 40000,
        //         age: 24
        //     },
        //     {
        //         name: "koushik",
        //         department: "db admin",
        //         salary: 25000,
        //         age: 21
        //     },
        //     {
        //         name: "deepika",
        //         department: "Accounts",
        //         salary: 35000,
        //         age: 31
        //     },
        //     {
        //         name: "koushik",
        //         department: "Devpos",
        //         salary: 50000,
        //         age: 22
        //     },
        //     {
        //         name: "gangireddy",
        //         department: "Devpos",
        //         salary: 40000,
        //         age: 22
        //     },
        //     {
        //         name: "soumya",
        //         department: "fullstack Deveoper",
        //         salary: 60000,
        //         age: 23
        //     }
        // ])

        // console.log("multipleEntries id:", multipleEntries);


        // const allEmployess = await employees.find().toArray();

        // console.log("allEmployess-----",allEmployess)

        // const updateEmp = await employees.updateOne({_id: new ObjectId('6acd922e0b0452ca543b2b66')},
        // {$set:{name:"harsih",age:24,salary:250000}})

        // console.log("updateEmp-----",updateEmp)

        const allEmployess = await employees.find({_id: new ObjectId('6acd922e0b0452ca543b2b66')}).toArray();

        console.log("allEmployess-----",allEmployess)


    } catch (error) {
        console.log("mongo connection error:", error)
    } finally{
        await client.close();
        console.log("MongoDB connection closed")
    }

}
connection()