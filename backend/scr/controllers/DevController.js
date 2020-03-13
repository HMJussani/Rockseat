const axios = require('axios');    // importa lib axios // yarn add axios
const Dev = require('../models/dev'); //import o model dev
const ParseStringTArray = require('../utils/ParseStringToArray');

//store cria no banco de dados
//index lista todos do banco
//destroy apaga user

module.exports = {

  async index(request, response) {
    const devs = await Dev.find();
    return response.json(devs);
  },

  async store(request, response) {     //async sem sincronismo
    // console.log(request.body);
    const { github_name, techs, longitude, latitude } = request.body;            //cria a variável e pega os dados pelo post
    //verifica se já tem cadastro
    let dev = await Dev.findOne({ github_name });
    if (!dev) {
      const apiresponse = await axios.get(`https://api.github.com/users/${github_name}`); //await espera o retorno
      // console.log(apiresponse.data);
      const { name = login, bio, avatar_url } = apiresponse.data; // pega os dados da resposta
      // console.log(name,avatar_url,bio, github_name);
      const techArray = ParseStringTArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
      dev = await Dev.create({
        name,
        github_name,
        bio,
        techs: techArray,
        avatar_url,
        location
      });
    }
    return response.json(dev); // retorno do obj jason
  }

};