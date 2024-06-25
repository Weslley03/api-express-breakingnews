import { loginService, generateToken } from "../services/auth.service.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, ok, message } = await loginService(email, password);

    if (!user || ok === false) {
      return res.status(400).json({ message });
    }

    const token = generateToken(user.id)
    return res.send({token});
  } catch (err) {
    res.status(500).send(`houve um erro: ${err}`);
  }
};

export { login };
