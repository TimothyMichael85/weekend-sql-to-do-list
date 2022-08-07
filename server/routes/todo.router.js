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

//GET
todoRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todo";';

    pool.query(queryText)
        .then((result) => {
            console.log(result);
            res.send(result.rows)
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500)
        })

    }); //end get

//POST
todoRouter.post('/', (req, res) => {
    let queryText = `INSERT INTO "todo" ("task", "is_done")
    VALUES ($1, $2);`;
    //let taskToAdd = (req.body) 
    console.log('router post', req.body)

    pool.query(
        queryText,
        [req.body.task, req.body.is_done])
        console.log('is this thing on?')
        .then((response) => {
            console.log(response);
            res.sendStatus(200)
        }).catch((error) => {
            console.log('error adding new task', error);
            res.sendStatus(500)
        })
    }); //end POST

    // PUT
todoRouter.put('/:id', (req, res) => {
    const id = req.params.id;
    
        let queryText = `
        UPDATE "todo"
        SET "is_done" = 'true' 
        WHERE "id" = $1;
        `;
        let queryValues = [id];
       
            pool.query(queryText, queryValues)
            .then( (result) => {
                console.log(result);
                res.sendStatus(200);
            }).catch( err => {
                console.log(err);
                res.sendStatus(500);
            });
    });

    // DELETE
todoRouter.delete("/:id", (req, res) => {
    const id = req.params.id;

    const queryText = `
    DELETE FROM "todo"
    WHERE "id" = $1;`;

    pool
    .query(queryText, [id])
    .then((result) => {
        res.sendStatus(204);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })
})



module.exports = todoRouter;