require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 7000;
const cors = require('cors');
const sequelize = require('./config/db');
const { User, Cars } = require('./models/models');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const path = require('path')

app.use(fileUpload({}));
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use('/api', router);
app.use(express.static(path.resolve('static')));
app.use(express.static(path.resolve('./frontend')));

async function start() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`);
        })
    } catch (error) {
        console.error(error)
    }
}

start()