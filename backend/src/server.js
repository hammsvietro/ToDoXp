require('dotenv').config();
const app = require('./app');

app.listen(3333, process.env.SV_HOST);
