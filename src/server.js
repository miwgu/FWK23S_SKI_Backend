//installerar express för att kunna använda express.Router()
const express = require('express');
//body parser är en middleware som används för att kunna tolka JSON
const bodyParser = require('body-parser');
//cors är en middleware som används för att kunna göra cross-origin requests på ett säkert sätt
const cors = require('cors');
//importerar routes från data_routes.js
const dataRoutes = require('./routes/data_routes');

const app = express();
//använder cors i appen för att kunna göra cross-origin requests på ett säkert sätt
app.use(cors());
//använder bodyParser i appen för att kunna tolka JSON
app.use(bodyParser.json());
//använder dataRoutes i appen för att kunna använda routes från data_routes.js
app.use('/data', dataRoutes);

module.exports = app;
