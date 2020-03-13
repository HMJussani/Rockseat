const mongoose = require('mongoose'); //importa a lib mongoose
const pointSchema = require('./utils/PointSchema'); //importa o ponto criado no mapa

const DevSchema = new  mongoose.Schema({
name : String,
github_name : String,
bio: String,
techs:[String],
avatar_url:String,

location:{
    type : pointSchema,
    index : '2dsphere'
        }

});  //cria o model devSchema

module.exports = mongoose.model('Dev',DevSchema);