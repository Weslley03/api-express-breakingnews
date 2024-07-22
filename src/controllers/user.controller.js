import userService from "../services/user.service.js"
import { generateToken } from "../services/auth.service.js";

const create = async (req, res) => {
  try {
    const { name, userName, email, password, avatar, background } = req.body;

    if (!name || !userName || !email || !password || !avatar || !background) {
      res.status(400).send({ message: "existem campos faltantes" });
    }

    const user = await userService.createService(req.body);
    if (!user) {
      return res.status(400).send({ message: "ERROR CREATE USER" });
    }

    const token = generateToken(user.id)

    res.status(201).send({
      menssage: "user create succesfully",
      tokenUser: token,

      user: {
        id: user._id,
        name,
        userName,
        email,
        avatar,
        background,
      },
    });

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  try {
    const users = await userService.findAllService();

    if (!users) {
      res.status(400).send({ message: "não existem usuarios para pesquisa" });
    }
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findById = async (req, res) => {
  try {
    const id = req.params.id
    
    if(!req.params.id){
      const user = await userService.GetByIdService(req.userId)
      res.send(user)
      return user
    } else{
      const user = await userService.GetByIdService(id)
      res.send(user)
      return user
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, userName, email, password, avatar, background } = req.body;

    if (!name && !userName && !email && !password && !avatar && !background) {
      res.status(400).send({ message: "necessario alterar ao menos um campo" });
    }

    let id = req.userId

    await userService.updateService(
      id,
      name,
      userName,
      email,
      password,
      avatar,
      background
    );
    res.status(200).send({ message: "usuario alterado com sucesso" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const id = req.id;
    const user = req.user;
    await userService.deleteService(id);
    res.status(200).send({ message: "usuario foi com Deus" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default { create, findAll, findById, update, remove };
