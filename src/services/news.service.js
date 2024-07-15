import News from "../models/News.js"

export const countNewsService = () => {
    const count = News.countDocuments().exec();
    return count;
} 
export const createService = async (body) => await News.create(body); 

export const updateService = (id, title, text, banner) => News.findOneAndUpdate(
    { _id: id }, 
    { title, text, banner },
    { rawResult: true }
) 

export const deleteByIdService = (id) => News.findOneAndDelete({_id: id}) 
export const topNewsService = () => News.findOne().sort({_id: -1}).populate('user')
export const findByIdService = async (id) => await News.findById(id).populate('user')
export const findByUserService = (userId) => News.find({user: userId}).sort({_id: -1}).sort({_id: -1}).populate('user')
export const findByIdServiceSimple = async (idNews) => {
    const news = await News.findById(idNews)
    return news
}

export const likeNewsService = async (newsId, userLiked) => {
    const likedOk = await News.findOneAndUpdate(
        {_id: newsId, 'likes.userLiked': {$nin: [userLiked]}},
        {$push: 
            {likes: 
                {userLiked, created: new Date()} 
            }
        }
    )

    if(!likedOk){
        return {ok: false}
    }
    return {ok: true}
} 

export const deleteLikeNewsService = (newId, userLiked) => News.findOneAndUpdate(
    {_id: newId},
    {$pull: 
        {likes: 
            {userLiked}
        }
    }
)

export const findByTitleService = (title) => News.find({
    title: {$regex: `${title || ''}`, $options: 'i'} //$regex vai servir pra especificar os parametros de busco, 'contenha o title'
}).sort({_id: -1}).populate('user')

export const findAllService = (offset, limit) => {
    return News.find().sort({_id: -1}).skip(offset).limit(limit).populate('user').cursor()
} 
/*xxxxx.find()
.sort({_id: -1}) nesse caso, trás os dados de trás pra frente, conforme criação dos ID (_id)
.skip(offset) de quantos em quantos o banco irá pular par trazer
.limit(limit) quantidade de amostra
.populate('user') através do ID, busca o USER e mostra também na busca 'relacionamento de tabela'
*/

export const addCommentService = (newsId, comment, userId) => {
    const commentId = Math.floor(Date.now() * Math.random()).toString(36)
    return News.findOneAndUpdate(
        { _id: newsId },
        {$push:
            {comments:
                {commentId, userId, comment, createdAt: new Date()}
            }
        }
    )
}

export const removeCommentService = (idNews, commentId, userId) => {
    return News.findOneAndUpdate(
    { _id: idNews }, 
    { $pull: { comments: {commentId, userId} } } 
)}
