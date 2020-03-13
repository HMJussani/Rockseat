const express = require ('express'); //importa a biblioteca express
const mongoose = require('mongoose'); //biblioteca para o banco mongodb
const routes = require('./routes'); //importa o arquivo de rotas! o ./ é pq está no mesmo dir
const cors = require('cors');
const http = require('http'); //carrega o modulo http
const app = express();   //cria o app através da lib express
const {setupWebsocket} = require('./utils/websockets');
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://mongodba:mongodba@cluster0-nq21q.mongodb.net/banco?retryWrites=true&w=majority', {
    useNewUrlParser: true,  
    useUnifiedTopology: true 
});
app.use(cors());
app.use(express.json()); //seta o express para manipular json
app.use(routes);
//MongoDb (banco de dados)
server.listen(8080); //seta a porta do app