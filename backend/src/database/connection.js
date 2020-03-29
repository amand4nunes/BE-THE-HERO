const knex = require('knex');

const configuration =require('../../knexfile');
//aqui é onde descide qual é a configuração que sera usada 
//no caso a banco de dados 
//no operador ternario esta sendo descidido 
//se o valor da variavel global for test será o banco de dados criado para teste
//se não será o ultilizado para desenvolvimento
const config = process.env.NODE_ENV == 'test' ? configuration.test : configuration.development;

const connection = knex(config);

module.exports = connection;