import mongoose  from "mongoose"
import bcrypt from "bcrypt"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    userName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        select: false
    },
    avatar: {
        type: String,
        require: true,
    },
    background: {
        type: String,
        require: true,
    }
})

//o .pre executa uma função antes de salvar os dados, nesse caso, ele ccriptografa a senha
UserSchema.pre('save', async function(next) { 
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

const User = mongoose.model('User', UserSchema)

export default User