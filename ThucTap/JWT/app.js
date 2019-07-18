const express = require('express');
const passport = require('passport');
const { mongoose } = require('./database/database');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

app.get('/test', (req, res) => {
    res.json({
        message: "Shen Long"
    })
})
app.post('/test', verifyToken, (req, res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: "Workout",
                authData
            })
        }
    })
})
app.post('/test/login', (req, res) => {
    const user = {
        fullName: "Bùi Thành Long",
        email: "longprodeptrai48@gmail.com"
    }
    jwt.sign({ user }, "secretkey",{expiresIn: '30s'}, (err, token) => {
        //console.log(token);
        res.json({
            token: token
        });
    });
})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader != 'undefined') {
        const bearer = bearerHeader.split(' ');

        const bearerToken = bearer[1];

        req.token = bearerToken;

        next();
    } else {
        res.send(403);
    }
}

app.listen(port, () => {
    console.log("Server is running on port: " + port);
})