import News from "../models/News.js"

export const countNewsService = () => News.countDocuments()
export const createService = (body) => News.create(body); 
export const topNewsService = () => News.findOne().sort({_id: -1}).populate('user')
export const findByIdService = (id) => News.findById(id).populate('user')

export const findByTitleService = (title) => News.find({
    title: {$regex: `${title || ''}`, $options: 'i'} //$regex vai servir pra especificar os parametros de busco, 'contenha o title'
}).sort({_id: -1}).populate('user')
export const findAllService = (offset, limit) => News.find().sort({_id: -1}).skip(offset).limit(limit).populate('user')
/*xxxxx.find()
.sort({_id: -1}) nesse caso, trás os dados de trás pra frente, conforme criação dos ID (_id)
.skip(offset) de quantos em quantos o banco irá pular par trazer
.limit(limit) quantidade de amostra
.populate('user') através do ID, busca o USER e mostra também na busca 'relacionamento de tabela'
*/


