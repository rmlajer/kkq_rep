const express = require('express');
const { Client } = require("pg");
const app = express();
const port = process.env.PORT || 3000;

const client = new Client({
  user: "hkweungc",
  host: "abul.db.elephantsql.com",
  database: "hkweungc",
  password: "zYd8bb-9q4xP766x_0NGZhwEil0R1DuN",
  port: 5432
});

client.connect();

app.use(express.text());
app.use(express.static("public"))

console.log("Querying database ...");

app.get('/question/:id', async (req, res) => {
  try {
    let queryData = await client.query(
      `SELECT food_id, name
      FROM question
      JOIN food ON question.option_0=food.food_id OR question.option_1=food.food_id
      WHERE question_id=${req.params.id}`);
    res.json({
      "ok": true,
      "data": queryData.rows,
    })
  } catch (error) {
    res.json({
      "ok": false,
      "message": error.message,
    })
  }
})

app.get('/questionbreakdown/:id', async (req, res) => {
  try {
    let queryData = await client.query(
      `SELECT food_id, 
      name, 
      co2e_per_kg, 
      agriculture, 
      iluc, 
      processing, 
      packaging, 
      transport, 
      retail 
      FROM question
      JOIN food ON question.option_0=food.food_id OR question.option_1=food.food_id
      WHERE question_id=${req.params.id}`);
    res.json({
      "ok": true,
      "data": queryData.rows,
    })
  } catch (error) {
    res.json({
      "ok": false,
      "message": error.message,
    })
  }
})

app.get('/emission_category', async (req, res) => {
  try {
    let queryData = await client.query(`SELECT * FROM emission_category`);
    res.json({
      "ok": true,
      "data": queryData.rows,
    })
  } catch (error) {
    res.json({
      "ok": false,
      "message": error.message,
    })
  }
})

app.get('/result', async (req, res) => {
  try {
    let queryData = await client.query(
      `SELECT answer_id,
      question.question_id,
      option_0,
      option_1,
      food_id,
      co2e_per_kg
      FROM answer
      JOIN question ON answer.question_id=question.question_id
      JOIN food ON question.option_0=food.food_id OR question.option_1=food.food_id
      WHERE answer_id = ${req.params.id}`);
    res.json({
      "ok": true,
      "data": queryData.rows,
    })
  } catch (error) {
    res.json({
      "ok": false,
      "message": error.message,
    })
  }
})

app.get('/result_level', async (req, res) => {
  try {
    let queryData = await client.query(
      `SELECT * FROM result_level WHERE level_id=${req.params.id}`);
    res.json({
      "ok": true,
      "data": queryData.rows,
    })
  } catch (error) {
    res.json({
      "ok": false,
      "message": error.message,
    })
  }
})



app.listen(port, () => {
  console.log(`listening to port: ${port}`);
})