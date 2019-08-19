import express from 'express'
import bodyParser from 'body-parser'
import {connect} from './config/db';
import {router} from './routers/index';
// import jsonwebtoken from 'jsonwebtoken'

const port = 3000;
const app = express();

connect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router);

app.listen(port, (req, res) => {
    console.log("Server is running on port: " + port);
})