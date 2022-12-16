const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool.js');

// GET
koalaRouter.get('/', (req, res) => {
    let sqlQuery = `
      SELECT * FROM "koala" 
        ORDER BY "id";
    `;
    pool.query(sqlQuery)
      .then((dbRes) => {
      // Sends back the array of koala objects objects:
        res.send(dbRes.rows);
      })
      .catch((dbErr) => {
        console.log('error getting books', dbErr);
        res.sendStatus(500);
      });
  });
// POST
koalaRouter.post('/',(req, res) => {
  console.log('POST /koala');
  console.log(req.body);
  let sqlQuery = `
    INSERT INTO "koala"
    ("name", "gender", "age", "ready_to_transfer", "notes")
    VALUES
    ($1, $2, $3, $4, $5);
  `
  let sqlValues = [req.body.name, req.body.gender, req.body.age, req.body.readyForTransfer, req.body.notes];
  pool.query(sqlQuery, sqlValues)
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch((dbErr) => {
      console.log('something broke in POST /koala', dbErr);
    })
});

// PUT

koalaRouter.put('/:id', (req, res) => {
  console.log('req.params:', req.params);
  console.log('req.body:', req.body);
  let idToUpdate = req.params.id;
  let newStatus = req.body.ready_to_transfer;

  let sqlQuery = `
    UPDATE "koala"
	    SET "ready_to_transfer"=$1
	    WHERE "id"=$2;
  ` 
  let sqlValues = [newStatus, idToUpdate];

  pool.query(sqlQuery, sqlValues)
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((dbErr) => {
      console.log('something broke in PUT', dbErr);
      res.sendStatus(500);
    })
})
// DELETE
koalaRouter.delete('/:id', (req, res) => {
  console.log(req.params);
  let idToDelete = req.params.id;
  let sqlQuery = `
  DELETE FROM "koala"
  WHERE "id"=$1;
  `
  let sqlValues = [idToDelete];
  pool.query(sqlQuery, sqlValues)
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((dbErr) => {
      console.log('broke in DELETE /koala/:id', dbErr);
      res.sendStatus(500);
    })
});



//
module.exports = koalaRouter;