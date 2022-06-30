const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const password = require('./db_settings');
const colors = require('colors');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: password,
    database: 'join_us'
});

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));


app.get('/', function (req, res) {
    const users_count = "SELECT COUNT(*) AS total FROM users";

    connection.query(users_count, function (error, results, fields) {
        if (error) throw error;
        const count = results[0].total;
        res.render('home', { count });
    });

});


app.post("/register", function (req, res) {
    // console.log("Email from /register: " + req.body.email);
    const person = {
        email: req.body.email
    };
    connection.query('INSERT INTO users SET ?', person, function (err, result) {
        if (err) throw err;
        res.redirect("/");
    });
});


app.listen(3000, function () {
    console.log("App listening on port 3000 :)".bold.magenta);
});