import { createService, findAllService, countNews } from "../services/news.service.js";

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
    let { limit, offset } = req.query
    limit = Number(limit)
    offset = Number(offset) //onde eu começo 'skip'

    if(!limit) {
      limit = 5
    }
    if(!offset) {
      offset = 0
    }

    const news = await findAllService(offset, limit);
    const total = await countNews()
    const currentUrl = req.baseUrl
    
    const next = offset + limit
    const nextUrl = next < total ? `${currentUrl}?limi=${limit}?offset=${next}` : null
    
    const previous = offset * limit < 0 ? null : offset - limit
    const previousUrl = previous != null ? `${currentUrl}?limi=${limit}?offset=${previous}` : null

    if(news.length === 0) {
        res.status(404).send({ message: 'não tem noticia véi' });
    }
    res.send({
      nextUrl, 
      previousUrl,
      limit,
      offset,
      total,
      results: news.map((newItem) => ({
        id: newItem._id,
        title: newItem.title,
        text: newItem.text,
        banner: newItem.banner,
        likes: newItem.likes,
        comments: newItem.comments,
        name: newItem.user.name,
        userName: newItem.user.username,
        userAvatar: newItem.user.avatar
      }))
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
    console.log("foi pro erro");
  }
};
