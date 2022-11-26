const express = require('express');
const {success} = require('./helper')
const app = express();
const pokemons = require('./mock-pokemon');
const morgan = require('morgan');
const favicon = require('serve-favicon')
const port = 3000;

app
	.use(favicon(__dirname+'/favicon.ico'))
	.use(morgan('dev'));

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


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

