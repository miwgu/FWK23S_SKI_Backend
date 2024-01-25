// dotenv config är en middleware som används för att kunna använda .env filen
require('dotenv').config();
//const app = require('./server.js') för att kunna använda appen i server.js
const app = require('./server.js');
//hämtar port från .env filen
const PORT = process.env.BACKEND_PORT

app.listen(PORT, () => {
    console.log(`http server listening on port ${PORT}`)
});
