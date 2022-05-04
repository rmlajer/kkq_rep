const express = require('express');
const { Client } = require("pg");
const app = express();
const port = 3000;

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

const food_qry = "SELECT * FROM food LIMIT 20";

console.log("Querying database ...");

app.get('/food', async (req, res) => {
  try {
    let queryData = await client.query(food_qry);
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
    console.log(`Appl. lytter på http://localhost:${port}`)
})