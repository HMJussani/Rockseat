const Dev = require('..//models/dev');
const ParseStringToArray = require('../utils/ParseStringToArray');

module.exports = {  
    async index(request, response) {
        const { latitude, longitude, techs } = request.query;       
        const techArray = ParseStringToArray(techs); 
        const dev = await Dev.find({
            techs: {
                $in: techArray, 
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