const crypto = require("crypto");


// const randomValue = crypto.randomBytes(16);
// console.log("randomVlaue---",randomValue)
// console.log("randomVlaue---",randomValue.toString("hex"))


// const password = "hello123";

// const hash = crypto
//     .createHash("sha256")
//     .update(password)
//     .digest("hex");

// console.log("hash---",hash)


// Verify password:

const password = "hello1234";

const storedHash = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

console.log("storedHash---", storedHash)

const loginPassword = "hello1234";

const loginHash = crypto
    .createHash("sha256")
    .update(loginPassword)
    .digest("hex");

console.log("loginHash---", loginHash);

if (storedHash === loginHash) {
    console.log("Login successful")
} else {
    console.log("Invalid password")
}