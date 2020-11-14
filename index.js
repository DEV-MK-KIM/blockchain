const express = require("express");
const bodyParser = require("body-parser")
const Blockchain = require("./blockchain");

const app = express();
const blocckhain = new Blockchain();

app.use(bodyParser.json())

app.get("/api/blocks", (req, res) => {
  res.json(blocckhain.chain);
});

app.post("/api/mine", (req, res) => {
  const { data } = req.body;
  blocckhain.addBlock({ data });
  
  res.redirect('/api/blocks')
});

const PORT = 3000;
app.listen(PORT, () => console.log(`listening at localhost:${PORT}`));
