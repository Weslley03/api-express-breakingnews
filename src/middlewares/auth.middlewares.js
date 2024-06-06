import dotenv from "dotenv";
import jwt, { decode } from "jsonwebtoken";
import userService from "../services/user.service.js";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(404).send("header sem auth");
    }
    const parts = authorization.split(" ");
    const [schema, token] = parts;
    if (parts.length !== 2) {
      return res.status(404).send("token não em formato 'Bearer xxxxxx'");
    }
    if (schema !== "Bearer") {
      return res.status(404).send("token sem Bearer");
    }

    jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {
      if (err) {
        return res.status(401).send({ msg: "tokken invalid" });
      } 
      console.log(decoded)
      const user = await userService.GetByIdService(decoded.id); //

      if (!user || !user.id) {
        return res.status(401).send({ msg: "user or id invalids" });
      }
      req.userId = user.id
      console.log(`${user.name} logado`)

      return next();
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
