const express = require('express');
const jwt = require('jsonwebtoken');

const PORT = 5500;
const secretKey = 'secret';
const app = express();


app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to API',
    })
});


app.post('/api/posts', verifyToken, (req, res) => {
    res.json({
        message: 'Post created ...',
        data:  req.authData,
    })
});


app.post('/api/login', (req, res) => {
    // Mock user
    const user = {
        id: 1,
        username: 'muneeb',
        email: 'muneeb@auth.com',
    }
   jwt.sign({user: user}, 'secret', (err, token) => {
       res.json({
           token
       });
   });
});


function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const bearerToken = bearerHeader.split(' ')[1];
        jwt.verify(bearerToken, 'secret', (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                req.authData = authData;
                next();
            }
        });
    } else {
        res.sendStatus(403);
    }
}

app.listen(PORT, () => console.log(`Server started on ${PORT}`));