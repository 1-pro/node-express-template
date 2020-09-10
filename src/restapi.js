require('./connections/connection.mongo')();
const client = require('./connections/connection.redis')();
const express = require('express');
const bodyParser = require('body-parser');
const tokenMiddleware = require('./middlewares/middleware.token').tokenMiddleware;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.status(200).json({ status: 'success', payload: { apiVersion: 1.0 ,date: getDate.now() }, message: 'Welcome to Lexclass REST API' });
});

//Auth Route
const authRoute = require('./routes/route.auth')();
app.use('/api/v1/auth', authRoute);

app.use(tokenMiddleware());

//User Route
const userRoute = require('./routes/route.user')();
app.use('/api/v1/user', userRoute);

//Admin Route
const adminRoute = require('./routes/route.admin')();
app.use('/api/v1/admin', adminRoute);

app.listen(9000, () => {
    console.log('User Microservice listening on port 9000')
});

module.exports.app = app;