const express = require('express');
const axios = require('axios');
const path = require('path'); // Para manejar rutas de archivos estáticos
const app = express();
const port = 3000;

// Servir archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint /pokemons
app.get('/pokemons', async (req, res) => {
    try {
        // Llamada a la API de Pokémon para obtener los primeros 5 Pokémon
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=5');
        const pokemons = response.data.results.map((pokemon, index) => ({
            id: index + 1,
            name: pokemon.name,
            url: pokemon.url
        }));
        res.json(pokemons);  // Devolver la lista de Pokémon como JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los datos de la API de Pokémon' });
    }
});

// Página de inicio que sirve un archivo HTML (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
