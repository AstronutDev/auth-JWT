const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const cookieParser = require('cookie-parser')

const authRoute = require('./routes/authRoutes')

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

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

//cookie
app.get('/set-cookies', (req, res ) => {
  // res.setHeader('Set-cookie', 'age = 23')
  res.cookie('name', 'pat')
  res.cookie('isEmployee', true, { maxAge: 3000, httpOnly: true})

  //for on https
  // res.cookie('isEmployee', true, { maxAge: 3000, secure: true})
  res.send('cookie is set')
})

app.get('/read-cookies', (req, res)=> {
  const cookies = req.cookies

  console.log(cookies);
  res.json({
    cookies
  })
})