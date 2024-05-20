import { createService, findAllService } from "../services/news.service.js";

export const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;
    if (!title || !text || !banner) {
      res.status(500).send({ message: "existem dados faltantes" });
    }
    
    await createService({
      title,
      text,
      banner,
      user: req.userId
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
