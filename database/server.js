const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require("./db/bukudb")
const cors = require("cors")

app.use(cors({
  credentials: true,
  origin: true
}))

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({
    pesan: "Oke"
  })
});

app.post('/create', (req, res) => {
  const buku = new db.buku(req.body);
  buku.save((err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.json(data);
    }
  })
})

app.get('/buku', (req, res) => {
  db.buku.find({}).then((data) => {
    res.json(data)
  })
})

app.put('/update/:id', (req, res) => {
  db.buku.update({
    _id: req.params.id
  }, req.body).then(() => {
    res.json({
      pesan: "Berhasil Update data"
    })
  })
})

app.delete('/delete/:id', (req, res) => {
  db.buku.remove({
    _id: req.params.id
  }).then(() => {
    res.json({
      pesan: "Berhasil menghapus data"
    })
  })
})

app.listen(3000, () => {
  console.log('port 3000')
})