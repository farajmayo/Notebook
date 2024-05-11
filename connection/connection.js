const mongoose = require("mongoose")


const connectDB = (url)=> {
    return mongoose.connect(url).then(()=>{
        console.log("Connected To DataBase")
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports = connectDB;