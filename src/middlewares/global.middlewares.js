import mongoose from "mongoose"
import userService from "../services/user.service.js"

export const validId = (req, res, next) => {
  try {
    let id;
  
    if(!req.params.id){
      req.params.id = req.userId;
      id = req.params.id;
    } else {
      id = req.params.id
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).send({ message: "o id não é mongoose." });
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const validUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await userService.GetByIdService(id);
    if (!user) {
      return res
        .status(400)
        .send({ message: "o ID está incorreto." });
    }

    req.id = id;
    req.user = user;

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
