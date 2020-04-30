const { Router } = require('express');
const DevController = require('../scr/controllers/DevController');
const SearchController = require('../scr/controllers/SearchController');

const routes = Router();
routes.get('/search', SearchController.index); 
routes.get('/devs', DevController.index);  
routes.post('/devs', DevController.store); 
module.exports = routes;