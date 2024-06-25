import jwt from "jsonwebtoken"
import User from "../models/User.js"
import bcrypt from "bcrypt";
import dotenv from "dotenv"
dotenv.config()

const loginService = (email, password) => {

    try{
        const user = User.findOne({email: email}).select('+password')
        if(!user){
            return { ok: false, message: 'não foi executar o service de LOGIN' }
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
          return { ok: false, message: "usuario ou senha invalidos" }
        }

        return {ok: true, user}
    }catch(err){
        console.log('houve um erro no service do back-end', err)
    }
}

const generateToken = (id) => {
    return jwt.sign({id: id}, process.env.SECRET_JWT, {expiresIn: 86400})
}

export { loginService, generateToken }