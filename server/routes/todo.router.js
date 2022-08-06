//const { Router } = require('express');
const express = require('express');
const todoRouter = express.Router();

// DB CONNECTION`
const pg = require('pg');
const Pool = pg.Pool;
const pool = new Pool({
    database: 'todo', //THIS CAN AND WILL CHANGE
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
});

// GET
// todoRouter.get('/', (req, res) => {
//     let queryText = 'SELECT * FROM "todo";';

//     pool.query(queryText)
//         .then((result) => {
//             console.log(result);
//             res.send(result.rows)
//         }).catch((err) => {
//             console.log(err);
//             res.sendStatus(500)
//         })

//}); //end get




module.exports = todoRouter;