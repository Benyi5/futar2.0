const express = require("express");
const app = express();
const PORT = 3000;
const fs = require("fs");
const cors = require("cors");
const path = require("path");
 
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "pizza"
});
 
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('Kapcsolódva az adatbázishoz.');
});
 
app.use(cors());
app.use(express.json());
 
app.use(express.static(path.join(__dirname, 'public')));
 
app.get('/', (req, res) => {
    res.header('Content-Type', 'text/html; charset=utf-8');
    res.status(201).sendFile(__dirname + '/public/index.html');
});
 
app.post('/futar', (req, res) => {
    let uj = req.body;
    let sql = 'INSERT INTO futar (fazon, fnev) VALUES (NULL,?)';
    let sqlParams = [uj.fnev];
    connection.query(sql, sqlParams, function(err, rows) {
        if (err) {
            console.error(err);
            res.status(500).send('Adatbázis hiba történt.');
            return;
        }
        let lastInsertId = rows.insertId;
        res.status(201).send({ id: lastInsertId, fnev: uj.fnev });
    });
});
 
app.get('/futar', (req, res) => {
    let sql = 'SELECT fnev FROM futar';
    connection.query(sql, function(err, rows) {
        if (err) {
            console.error(err);
            res.status(500).send('Adatbázis hiba történt.');
            return;
        }
        res.send(rows);
    });
});
 
app.get('/futar/:id', (req, res) => {
    let id = req.params.id;
    let sql = 'SELECT fnev FROM futar WHERE fazon = ?';
    let sqlParams = [id];
    connection.query(sql, sqlParams, function(err, rows) {
        if (err) {
            console.error(err);
            res.status(500).send('Adatbázis hiba történt.');
            return;
        }
        res.send(rows);
    });
})
 
app.put('/futar/:id', (req, res) => {
    let id = req.params.id;
    let uj = req.body;
    let sql = 'UPDATE futar SET fnev = ? WHERE fazon = ?';
    let sqlParams = [uj.fnev, id];
    connection.query(sql, sqlParams, function(err, rows) {
        if (err) {
            console.error(err);
            res.status(500).send('Adatbázis hiba történt.');
            return;
        }
        res.status(201).send(rows);
    });
});
 
app.delete('/futar/:id', (req, res) => {
    let id = req.params.id;
    let sql = 'DELETE FROM futar WHERE fazon = ?';
    let sqlParams = [id];
    connection.query(sql, sqlParams, function(err, rows) {
        if (err) {
            console.error(err);
            res.status(500).send('Adatbázis hiba történt.');
            return;
        }
        res.status(201).send(rows);
    });
});
 
app.listen(3000, () => {
    console.log('A szerver elindult a 3000-es porton.');
});