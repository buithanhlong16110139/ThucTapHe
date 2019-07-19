import express from 'express';
import bodyParser from 'body-parser';
import {connect} from './database/database';
import {router} from './resource/index';


connect();
const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router);
app.listen(port, (req, res) => {
    console.log("Server is running on port: " + port);
})