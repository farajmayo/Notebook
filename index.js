const express = require("express")
const connectToDb = require("./connection/connection")
const router = require("./routes/userRoute")

const app = express()
const PORT = 2025

connectToDb("mongodb://localhost:27017/Notebook-Demo")


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user" , router)



app.listen(PORT , () =>{console.log("Connected")})