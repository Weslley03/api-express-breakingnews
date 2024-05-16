import User from "../models/User.js"

const loginService = (email) => {
    return User.findOne({email: email}).select('+password')
}

export { loginService }