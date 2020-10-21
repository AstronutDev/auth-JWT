const express = require('express');
const mongoose = require('mongoose');
const path = require('path')

const authRoute = require('./routes/authRoutes')

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// view engine
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs');


// database connection
const dbURI = 'mongodb://localhost:27017/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoute)