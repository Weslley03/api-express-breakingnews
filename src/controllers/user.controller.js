const { json } = require('express')
const userService = require('../services/user.service')
const mongoose = require("mongoose")

const create = async (req, res) => {
    const { name,userName,email,password,avatar,background } = req.body

    if(!name || !userName || !email || !password || ! avatar || !background) { 
        res.status(400).send({message: "existem campos faltantes"})
    }

    const user = await userService.createService(req.body)
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

const findAll = async (req, res) => {
    const users = await userService.findAllService()

    if(!users) {
        res.status(400).send({message: 'não existem usuarios para pesquisa'})
    }
    res.send(users)
}

const findById = async (req, res) => {
    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).send({message: 'o ID tá certo, caralho?'})
    } else {
        const userPorId = await userService.GetByIdService(id)

    if(!userPorId) {
        res.status(400).send({message: 'o ID tá certo, caralho?'})
    }
    res.send(userPorId)
    }
}

const update = async (req, res) => {
    const { name,userName,email,password,avatar,background } = req.body

    if(!name && !userName && !email && !password && !avatar && !background) { 
        res.status(400).send({message: "necessario alterar ao menos um campo"})
    }

    const id = req.params.id
    let userExiste = await userService.GetByIdService(id)
    if(!userExiste){
        res.status(400).send({message: 'esse usuario não existe !!'})
    } else {
        userExiste = await userService.updateService(id, req.body)
        res.status(200).send({message: 'usuario alterado com sucesso'})
    }
}

const remove = async (req, res) => {
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).send({message: 'o ID tá certo, caralho?'})
    } 
    let userPorId = await userService.GetByIdService(id)
    if(!userPorId) {
        res.status(400).send({message: 'digita essa porra certo'})
    } else {
        userPorId = await userService.deleteService(id)
        res.status(200).send({message: 'usuario foi com Deus'})
    }
}

module.exports = { create, findAll, findById, update, remove}