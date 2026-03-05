const express = require('express');
const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, 'src', 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const rutasHome = require('./src/modules/home/home.routes');
app.use('/', rutasHome);

app.use((request, response, next) => {
    response.status(404).render('pages/error404');
});

app.listen(3000);