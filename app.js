const colors = require('colors');
const mysql = require('mysql');
const express = require('express');
const password = require('./db_settings');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: password,
    database: 'join_us'
});

const app = express();

app.set('view engine', 'ejs');


app.get('/', function (req, res) {
    const users_count = "SELECT COUNT(*) AS total FROM users";

    connection.query(users_count, function (error, results, fields) {
        if (error) throw error;
        const count = results[0].total;
        res.render('home', { count });
    });

});


app.listen(8080, function () {
    console.log("App listening on port 8080 :)".bold.magenta);
});