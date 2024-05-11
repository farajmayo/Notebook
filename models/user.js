const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
}, {timestamps : true})

UserSchema.pre('save' ,async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password , salt)
    next()
})

UserSchema.statics.login = async function (email  , password) {
    const userExist = await this.findOne({email })
    if(userExist){
        const auth = await bcrypt.compare(password , userExist.password)
        if(auth){
            return userExist
        }else{
            throw new Error("Incorrect Password") 
        }
    }else{
        throw new Error("User With This Email Not Exists")
    }
}



const User = mongoose.model("User", UserSchema)

module.exports = User