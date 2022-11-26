const express = require('express');
const {success, getUniqueId} = require('./helper')
const {Sequelize} = require('sequelize');
const app = express();
let pokemons = require('./mock-pokemon');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const favicon = require('serve-favicon')
const port = 3000;

const sequelize = new Sequelize(
	'pokedex',
	'laye',
	'mangane12',
	{
		host: 'localhost',
		dialect: 'mariadb',
		dialectOptions: {
			timeZone: 'Etc/GMT-2'
		},
		logging: false
	}
)

sequelize.authenticate()
		 .then(_ => console.log(`La connexion à la base de données a bien été établie !`))
		 .catch(error => console.error(`Impossible de se connecter à la base de données !`));

app
	.use(favicon(__dirname+'/favicon.ico'))
	.use(morgan('dev'))
	.use(bodyparser.json());

app.get('/', (req, res) => res.send('Hello World 👍'));

app.get('/api/pokemons/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const pokemon = pokemons.find(pokemon => pokemon.id === id);
	const message = 'Un pokemon a bien été trouvé !';
	res.json(success(message, pokemon));
});

app.get('/api/pokemons', (req, res)=>{
	message = `La liste des ${pokemons.length} pokemons a été bien recupérée !`;
	res.json(success(message, pokemons));
})

app.post('/api/pokemons', (req, res)=>{
	const id = getUniqueId(pokemons);
	const pokemonCreated = {...req.body, ...{id: id, created: new Date()}};
	pokemons.push(pokemonCreated);
	const message = "Un nouveau pokemon a été ajouter !";
	res.status(201).json(success(message, pokemonCreated));
})

app.put('/api/pokemons/:id', (req, res)=>{
	const id = parseInt(req.params.id);
	const pokemonUpdated = {...req.body, id: id};
	pokemons = pokemons.map(pokemon => {
		return pokemon.id === id ? pokemonUpdated : pokemon
	});
	const message = `Le pokemon ${pokemonUpdated.name} a bien été modifier`;
	res.status(200).json(success(message, pokemonUpdated));
})

app.delete('/api/pokemons/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const pokemonDeleted = pokemons.find(p => p.id === id);
	pokemons.filter(pokemon => pokemon.id !== id);
	const message = `le pokemon ${pokemonDeleted.name} a été supprimer !`;
	res.status(200).json(success(message, pokemonDeleted));

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

