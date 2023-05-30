const express = require('express')
const cors = require('cors')
const bodyParser= require('body-parser')
const mongoose = require('mongoose')
const routes = require("./routes/api")
require('dotenv').config({path:"./config.env"})
let app = express()
const port = process.env.PORT || 3001

mongoose
    .connect(process.env.DB, { useNewUrlParser: true })
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.log(err));

mongoose.Promise = global.Promise

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/api", routes)
app.use((err, req, res, next) => {
    console.log(err);
    next();
  });

app.listen(port, () =>  {
    console.log(`Server running on port ${port}`)
})
