const { request, response } = require('express');
const express = require('express');
const app = express();
const fs = require('fs');

const mysql = require('mysql2');
const { DB_CONNECTION } = require('./const');
// const DB_CONNECTION = {
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: '614088',
//    database: 'sys'
//    
// }
console.log(8888, DB_CONNECTION, DB_CONNECTION.password, DB_CONNECTION.user);

const connection = mysql.createConnection({
    host: DB_CONNECTION.host,
    port: DB_CONNECTION.port,
    user: DB_CONNECTION.user,
    password: DB_CONNECTION.password,
    database: DB_CONNECTION.database
});

connection.connect((err) => {
    if (!err) {
        console.log('SUCCESS');
    } else {
        console.error(err);
    }
});

app.get('/commemorative', (request, response) => {
    connection.query('SELECT * FROM sys.coins;',
        (err, data) => {
            if (err) return response.status(500);
            const result = data.filter((item) => item.category === 'commemorative')
            response.json(result);
        })
});

app.get('/bullion', (request, response) => {
    connection.query('SELECT * FROM sys.coins;',
        (err, data) => {
            if (err) return response.status(500);
            const result = data.filter((item) => item.category === 'bullion')
            response.json(result);
        })
});

app.get('/exclusive', (request, response) => {
    connection.query('SELECT * FROM sys.coins;',
        (err, data) => {
            if (err) return response.status(500);
            const result = data.filter((item) => item.category === 'exclusive')
            response.json(result);
        });
});

// Полный список монет
app.get('/coins', (request, response) => {
    connection.query('SELECT * FROM sys.coins;',
        (err, data) => {
            if (err) return response.status(500);
            response.json(data);
        })
});

// Информация по одной монете
app.get('/coins/:id', (request, response) => {
    connection.query(`SELECT * FROM sys.coins WHERE id = ${request.params.id};`,
        (err, data) => {
            if (err) return res.status(500);
            response.json(data);
        })
});

// Ответ по инпуту
app.get('coins/:id', (request, response) => {
    сonnection.query(`SELECT * FROM sys.coins WHERE id = '${request.params.id}'
    OR naming REGEXP '^${request.params.id}'
    OR paragraph_one REGEXP '^${request.params.id}'
    OR paragraph_two REGEXP '^${request.params.id}'
    OR paragraph_three REGEXP '^${request.params.id}'
    OR paragraph_four REGEXP '^${request.params.id}'
    OR paragraph_five REGEXP '^${request.params.id}'
    OR paragraph_six REGEXP '^${request.params.id}'
    OR paragraph_seven REGEXP '^${request.params.id}'
    OR paragraph_eight REGEXP '^${request.params.id}'
    OR paragraph_nine REGEXP '^${request.params.id}'
    OR paragraph_ten REGEXP '^${request.params.id}';`,
        (err, data) => {
            if (err) return response.status(500);
            response.json(data);
        })

});

// фильтр по цене и году
app.get('/coinsYearAndPrice/:fromP/:toP/:fromY/:toY', (request, response) => {
    connection.query(`SELECT * FROM sys.coins WHERE issued BETWEEN '${request.params.yearMin}$' AND '${request.params.yearMax}$'
    AND Price BETWEEN '${request.params.priceMin}$' AND '${request.params.priceMax}$';`,
        (err, data) => {
            if (err) return response.status(500);
            response.json(data);
        })
})

app.listen(5000, () => {
    console.log('Server is started on port 5000')
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));