const axios = require('axios');    
const Dev = require('../models/dev');
const ParseStringTArray = require('../utils/ParseStringToArray');

//store cria no banco de dados
//index lista todos do banco

module.exports = {

  async index(request, response) {
    const devs = await Dev.find();
    return response.json(devs);
  },

  async store(request, response) { 
    const { github_name, techs, longitude, latitude } = request.body; 
    let dev = await Dev.findOne({ github_name });
    if (!dev) {
      const apiresponse = await axios.get(`https://api.github.com/users/${github_name}`);
      const { name = login, bio, avatar_url } = apiresponse.data; 
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
    return response.json(dev); 
  }

};