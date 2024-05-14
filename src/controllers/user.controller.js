const create = (req, res) => {
    const { name,userName,email,password,avatar,background } = req.body

    if(!name || !userName || !email || !password || ! avatar || !background) { 
        res.status(400).send({message: "existem campos faltantes"})
    }

    res.status(201).send({
        menssage: "user create succesfully",

        user: {
            name,
            userName,
            email,
            avatar,
            background
        }
    })
}

module.exports = { create }