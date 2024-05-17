import { createService, findAllService } from "../services/news.service.js";

export const create = async (req, res) => {
  try {
    const { title, text, banner } =  req.body

    if(!title || !text || !banner) {
        res.status(500).send({message: "existem dados faltantes"});
    }
    await createService({
        title,
        text, 
        banner,
        id: 'objectIdFake'
    })

    res.send("criação de post");
    
  } catch (err) {
    res.status(500).send({ message: err.message });
    console.log('foi pro erro')
  }
};

export const findAll = async (req, res) => {
  const news = [];
  res.send(news);
};
