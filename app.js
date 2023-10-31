const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();

const port = 3000;

// Database connection
var con = mysql.createConnection({
  host: "127.0.0.1:3306",
  user: "root",
  password: "root",
  database: "noodle_dhbw"
});
con.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Middleware
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routes

// Registration page
app.get('/register', (req, res) => {
  res.render('register');
});

// Registration form handling
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Hash and salt the password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;

    // Store the user in the database with hashed password
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (err, result) => {
      if (err) throw err;
      res.redirect('/login');
    });
  });
});

// Login page
app.get('/login', (req, res) => {
  res.render('login');
});

// Login form handling
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Fetch user from the database by username
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      // Compare the stored hash with the entered password
      bcrypt.compare(password, results[0].password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          req.session.loggedin = true;
          req.session.username = username;
          res.redirect('/dashboard');
        } else {
          res.send('Incorrect username and/or password!');
        }
      });
    } else {
      res.send('User not found');
    }
  });
});


// Dashboard page
app.get('/dashboard', (req, res) => {
  if (req.session.loggedin) {
    res.send(`Welcome back, ${req.session.username}!`);
  } else {
    res.send('Please log in to view this page.');
  }
});

app.get('/', (req, res) => {
  // Retrieve user's shopping list from the database and render it in index.ejs
});

app.post('/add-item', (req, res) => {
  // Handle adding items to the shopping list
});

app.post('/remove-item', (req, res) => {
  // Handle removing items from the shopping list
});

// Add more routes as needed.

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
