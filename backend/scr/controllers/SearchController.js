const Dev = require('..//models/dev');
const ParseStringToArray = require('../utils/ParseStringToArray');

module.exports = {
    //busca user
    async index(request, response) {
        const { latitude, longitude, techs } = request.query; //recebe a rquisição da busca
        // console.log(request.query); //retorno da query
        const techArray = ParseStringToArray(techs); //converte em array   
        const dev = await Dev.find({
            techs: {
                $in: techArray, //procura dentro do array
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });
        return response.json(dev);
    },
};