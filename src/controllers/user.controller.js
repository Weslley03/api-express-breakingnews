const userService = require('../services/user.service')

const create = async (req, res) => {
    const { name,userName,email,password,avatar,background } = req.body

    if(!name || !userName || !email || !password || ! avatar || !background) { 
        res.status(400).send({message: "existem campos faltantes"})
    }

    const user  = await userService.create(req.body)
    if(!user) {
        return res.status(400).send({message: 'ERROR CREATE USER'})
    }

    res.status(201).send({
        menssage: "user create succesfully",

        user: {
            id: user._id,
            name,
            userName,
            email,
            avatar,
            background
        }
    })
}

module.exports = { create }