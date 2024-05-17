import { createService, findAllService } from "../services/news.service.js";

export const create = async (req, res) => {
  try {
    const { authorization } = req.headers
    if(!authorization) {
        return res.status(404).send('erro porra')
    }
    const parts = authorization.split(" ")
    const [ schema, token ] = parts
    if(parts.length !== 2) {
        return res.status(404).send('erro porra')
    }
    if(schema !== 'Bearer') {
        return res.status(404).send('erro porra')
    }

    const { title, text, banner } = req.body;
    if (!title || !text || !banner) {
      res.status(500).send({ message: "existem dados faltantes" });
    }
    
    await createService({
      title,
      text,
      banner,
      user: {_id: '66450ee13deecb4458668803'},
    });

    res.send("criação de post");
  } catch (err) {
    res.status(500).send({ message: err.message });
    console.log("foi pro erro");
  }
};

export const findAll = async (req, res) => {
  try {
    const news = await findAllService();
    if(news.length === 0) {
        res.status(404).send({ message: 'não tem noticia véi' });
    }
    res.send(news);
  } catch (err) {
    res.status(500).send({ message: err.message });
    console.log("foi pro erro");
  }
};
