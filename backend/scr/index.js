const express = require ('express'); 
const mongoose = require('mongoose'); 
const routes = require('./routes'); 
const cors = require('cors');
const http = require('http'); 
const app = express(); 
const {setupWebsocket} = require('./utils/websockets');
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://mongodba:mongodba@cluster0-nq21q.mongodb.net/banco?retryWrites=true&w=majority', {
    useNewUrlParser: true,  
    useUnifiedTopology: true 
});
app.use(cors());
app.use(express.json()); 
app.use(routes);
server.listen(8080); 