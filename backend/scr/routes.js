const { Router } = require('express'); //importa somente o pacote Router da lib express
const DevController = require('../scr/controllers/DevController');
const SearchController = require('../scr/controllers/SearchController');

const routes = Router();
routes.get('/search', SearchController.index); //busca especfico

routes.get('/devs', DevController.index);  //retorna lista
routes.post('/devs', DevController.store);  //cria no banco
module.exports = routes;