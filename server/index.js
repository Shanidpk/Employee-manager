const express = require('express')
const cors = require('cors')
const mongoose = require('../server/db')
const routes = require('./routes')


const app = express();
app.use(express.json())

app.use(cors({orgin:'http://localhost:4200'}))

app.listen(3000, () => {
    console.log("port running");
})

app.use('/employee',routes)
