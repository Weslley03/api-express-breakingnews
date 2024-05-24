import {
  createService,
  updateService,
  findAllService,
  countNewsService,
  topNewsService,
  findByIdService,
  findByTitleService,
  findByUserService,
  deleteByIdService,
  likeNewsService,
  deleteLikeNewsService,
  addCommentService,
  removeCommentService
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
      return res.status(404).send({ message: "essa noticia nãõ existe" });
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

export const update = async (req, res) => {
  try {
    const userId = req.userId;
    const newsId = req.params.id;
    const { title, text, banner } = req.body;

    if (!title && !text && !banner) {
      res.status(500).send({ message: "existem dados faltantes" });
    }

    const news = await findByIdService(newsId);
    if (!news) {
      return res.status(404).send({ msg: "Notícia não encontrada" });
    }

    if (news.user._id != userId) {
      return res
        .status(404)
        .send({ msg: "você não tem permissão para mudar essa noticia" });
    }

    console.log(news.user._id);
    console.log(userId);
    console.log(title, text, banner);

    await updateService(newsId, title, text, banner);
    return res.status(200).send({ msg: "noticia atualizada com sucesso" });
  } catch (err) {
    console.error("Erro ao atualizar notícia:", err); // Log do erro para depuração
    return res
      .status(500)
      .send({ msg: `Erro ao atualizar notícia: ${err.message}` });
  }
};

export const deleteById = async (req, res) => {
  try {
    const newsId = req.params.id;
    const userId = req.userId;
    const news = await findByIdService(newsId);

    if (news.user._id != userId) {
      return res
        .status(404)
        .send({ msg: "você não tem permissão para excluir esse usuário" });
    }

    await deleteByIdService(newsId);
    res.send({ msg: "noticia excluído com sucesso" });
  } catch (err) {
    console.error("erro ao EXCLUIR essa notícia:", err); // Log do erro para depuração
    return res
      .status(500)
      .send({ msg: `erro ao EXCLUIR notícia: ${err.message}` });
  }
};

export const likeNews = async (req, res) => {
  try {
    const newId = req.params.id;
    const userLiked = req.userId;
    const newsLiked = await likeNewsService(newId, userLiked);

    if (!newsLiked) {
      await deleteLikeNewsService(newId, userLiked);
      return res.status(200).send({ msg: `post DESCURTIDO com sucesso` });
    }

    res.status(200).send({ msg: `post CURTIDO com sucesso` });
  } catch (err) {
    console.error("error", err); // Log do erro para depuração
    return res.status(500).send({ msg: `error: ${err.message}` });
  }
};

export const addComment = async (req, res) => {
  try {
    const userId = req.userId;
    const newsId = req.params.id;
    const { comment } = req.body;

    if (!comment) {
      res.status(400).send({ msg: "existem dados faltantes" });
    }

    await addCommentService(newsId, comment, userId);
    res.send({msg: 'comentario add'})
  } catch (err) {
    console.error("error", err); // Log do erro para depuração
    return res.status(500).send({ msg: `error: ${err.message}` });  
  }
};

export const removeComment = async (req, res) => {
  try {
    const userId = req.userId;
    const idNews = req.params.idNews;
    const commentId = req.params.commentId;

    const remover = await removeCommentService(idNews, commentId, userId)

    const commentFind = remover.comments.find(comments => {
      return comments.commentId === commentId
    })

    if(!commentFind){
      return res.status(404).send({ msg: `o comment não foi encontrado`});
    }

    if(commentFind.userId !== userId){
      return res.status(404).send({ msg: `você não pode remover esse comentario`});
    }

    res.status(200).send({ msg: `comment removido com sucesso`});
  }catch(err) {
    console.error("error", err); // Log do erro para depuração
    return res.status(404).send({ msg: `houve um erro, caiu no catch: ${err.message}` }); 
  }
}