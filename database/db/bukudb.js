const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/buku', {
  useNewUrlParser: true
})

const db = mongoose.connection

db.on("error", () => console.log("database error"));
db.once('open', () => console.log("Conncected"));

let projectSchema = mongoose.Schema({
  judul_buku: String,
  pengarang: String,
  penerbit: String,
  jumlah_halaman: Number,
  tahun_terbit: Number,
  harga: Number,
  deskripsi: String
})

exports.buku = mongoose.model("buku", projectSchema);