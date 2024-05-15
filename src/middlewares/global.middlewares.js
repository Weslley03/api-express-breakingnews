const mongoose = require("mongoose");
const userService = require("../services/user.service");

const validId = (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).send({ message: "o ID tá certo, caralho?" });
  }

  next();
};

const validUser = async (req, res, next) => {
  const id = req.params.id;
  const user = await userService.GetByIdService(id);
  if (!user) {
    return res.status(400).send({ message: "digita essa porra desse ID certo" });
  }

  req.id = id
  req.user = user
  
  next();
};  

module.exports = { validId, validUser };
