import {
  createService,
  findAllService,
  countNewsService,
  topNewsService,
  findByIdService,
  findByTitleService,
  findByUserService,
} from "../services/news.service.js";

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
      user: req.userId,
    });

    res.send("criação de post");
  } catch (err) {
    res.status(500).send({ message: err.message });
    console.log("foi pro erro");
  }
};

export const findAll = async (req, res) => {
  try {
    let { limit, offset } = req.query;
    limit = Number(limit);
    offset = Number(offset); //onde eu começo 'skip'

    if (!limit) {
      limit = 5;
    }
    if (!offset) {
      offset = 0;
    }

    const news = await findAllService(offset, limit);
    const total = await countNewsService();
    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < total ? `${currentUrl}?limi=${limit}?offset=${next}` : null;

    const previous = offset * limit < 0 ? null : offset - limit;
    const previousUrl =
      previous != null
        ? `${currentUrl}?limi=${limit}?offset=${previous}`
        : null;

    if (news.length === 0) {
      res.status(404).send({ message: "não tem noticia véi" });
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
        userAvatar: newItem.user.avatar,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
    console.log("foi pro erro");
  }
};

export const topNews = async (req, res) => {
  try {
    const news = await topNewsService();

    if (!news) {
      res.status(404).send({ message: "você é o problema do sistema" });
    }

    res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        userName: news.user.username,
        userAvatar: news.user.avatar,
      },
    });
  } catch (err) {
    res.status(404).send({ message: "você é o problema do sistema" });
  }
};

export const findById = async (req, res) => {
  try {
    const id = req.params.id;
    const noticia = await findByIdService(id);
    if (!noticia) {
      res.status(404).send({ message: "essa noticia nãõ existe" });
    }
    res.status(200).send({
      noticia: {
        id: noticia._id,
        title: noticia.title,
        text: noticia.text,
        banner: noticia.banner,
        likes: noticia.likes,
        comments: noticia.comments,
        name: noticia.user.name,
        userName: noticia.user.username,
        userAvatar: noticia.user.avatar,
      },
    });
  } catch (err) {
    res.status(404).send({ message: "você é o problema do sistema" });
  }
};

export const findByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    const news = await findByTitleService(title);
    console.log(news.name);

    if (news.length === 0) {
      res.status(404).send({ message: "você é o problema do sistema" });
    }
    res.status(200).send(
      news.map((newItem) => ({
        id: newItem._id,
        title: newItem.title,
        text: newItem.text,
        banner: newItem.banner,
        likes: newItem.likes,
        comments: newItem.comments,
        name: newItem.user.name,
        userName: newItem.user.username,
        userAvatar: newItem.user.avatar,
      }))
    );
  } catch (err) {
    res.status(404).send({ message: "você é o problema do sistema" });
  }
};

export const findByUser = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);
    const news = await findByUserService(userId);
    if (!news) {
      res.status(404).send({ message: "você é o problema do sistema" });
    } else {
      res.status(200).send(
        news.map((newItem) => ({
          id: newItem._id,
          title: newItem.title,
          text: newItem.text,
          banner: newItem.banner,
          likes: newItem.likes,
          comments: newItem.comments,
          name: newItem.user.name,
          userName: newItem.user.username,
          userAvatar: newItem.user.avatar,
        }))
      );
    }
  } catch (err) {
    res.status(404).send({ message: "você é o problema do sistema" });
  }
};
