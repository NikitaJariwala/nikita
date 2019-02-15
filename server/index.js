// Include the cluster module
const express = require('express');

const bodyParser = require('body-parser');
const fs = require('fs');
var cors = require('cors')
const path = require('path');
const { includeAllLogs, port } = require('./configs/general');
const customerRoute = require('./routes/customer.route');


// Creating the express instance
let app = express();
app.options('*', cors());
app.use(cors());
global.__basedir = __dirname;

let uploadDirectory = path.join(__dirname, 'assets/images/');
fs.existsSync(uploadDirectory) || fs.mkdirSync(uploadDirectory);

app.use(express.static(uploadDirectory));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/customer', customerRoute);


app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        detail: err
    });
});

// Code to run if we're in the master process

app.listen(port);
console.log('Worker running! on port = %d',  port);

//     app.listen(port);
