import News from "../models/News.js"

export const countNews = () => News.countDocuments()
export const createService = (body) => News.create(body); 
export const findAllService = (offset, limit) => News.find().sort({_id: -1}).skip(offset).limit(limit).populate('user')
/*xxxxx.find()
.sort({_id: -1}) nesse caso, trás os dados de trás pra frente, conforme criação dos ID (_id)
.skip(offset) de quantos em quantos o banco irá pular par trazer
.limit(limit) quantidade de amostra
.populate('user') através do ID, busca o USER e mostra também na busca 'relacionamento de tabela'
*/


