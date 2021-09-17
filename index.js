const express = require('express');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectionDB = require('./db.js')
const routes = require('./routes/routes')

const app = express();
connectionDB()
app.use(express.json());
app.use(cors());
app.get("/",(req,res) => res.send("Hello"))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(`/api`, routes.routes);

const port = config.port || 3000
app.listen(config.port, () => console.log("App Listening on url http://localhost:" + port));

