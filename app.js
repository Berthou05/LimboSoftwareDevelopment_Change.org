const express = require('express');
const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// TODO: Importar las rutas 
const rutasVideojuegos = require('./routes/videojuegos.routes');
app.use('/videojuegos', rutasVideojuegos);

// TODO: Agregar el middleware para manejar errores 404
app.use((request, response, next) => {
    response.status(404).send("El videojuego no existe");
});

app.listen(3000);