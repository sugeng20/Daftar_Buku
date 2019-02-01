$('.carousel').carousel({
  interval: 5000
})

new Vue({
  el: "#app",
  data: {
    books: [],
    book: "",
    jb: "",
    pg: "",
    pt: "",
    jh: "",
    tt: "",
    hg: "",
    ds: "",
    array: {},
    errors: [],
    searchTerms: ""
  },
  methods: {
    tambahBuku() {

      if (!this.jb) {
        this.errors.push({
          jb: "*Nama Harus di isi*"
        })
      }
      if (!this.pg) {
        this.errors.push({
          pg: "*Nama Pengarang Harus di isi*"
        })
      }
      if (!this.pt) {
        this.errors.push({
          pt: "*Nama Penerbit Harus di isi*"
        })
      }
      if (!this.jh) {
        this.errors.push({
          jh: "*Jumlah Halaman Harus di isi*"
        })
      }
      if (!this.tt) {
        this.errors.push({
          tt: "*Tahun Terbit Harus di isi*"
        })
      }
      if (!this.hg) {
        this.errors.push({
          hg: "*Harga Harus di isi*"
        })
      }
      if (!this.ds) {
        this.errors.push({
          ds: "*Deskripsi Harus di isi*"
        })
      }
      if (this.jb && this.pg && this.pt && this.jh && this.tt && this.hg && this.ds) {
        axios.post('http://localhost:3000/create', {
          judul_buku: this.jb,
          pengarang: this.pg,
          penerbit: this.pt,
          jumlah_halaman: this.jh,
          tahun_terbit: this.tt,
          harga: this.hg,
          deskripsi: this.ds
        }).then((res) => {
          this.books.push(res.data);
          this.jb = ""
          this.pg = ""
          this.pt = ""
          this.jh = ""
          this.tt = ""
          this.hg = ""
          this.ds = ""
          this.errors = []
        })
        swal({
          title: "Berhasil!",
          text: "Data Buku Berhasil di tambah",
          icon: "success",
          button: "Oke",
        });
      }


    },
    ubahBuku(book) {
      this.array = book;
    },
    updateBuku() {
      axios.put(`http://localhost:3000/update/${this.array._id}`, this.array).then((res) => {
        this.cara = {}
      })
      swal({
        title: "Berhasil!",
        text: "Data Buku Berhasil di update",
        icon: "success",
        button: "Oke",
      });
    },
    hapusBuku(book) {

      Swal.fire({
        title: 'Apa Kamu Yakin?',
        text: "Jika kamu Menhapus akan kehilangan data!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya Hapus!',
        cancelButtonText: 'Batal!'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          axios.delete(`http://localhost:3000/delete/${book._id}`).then((res) => {
            const index = this.books.indexOf(book)
            this.books.splice(index, 1)
          })
        }
      })


    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
  },
  created() {
    axios.get('http://localhost:3000/buku').then((res) => {
      this.books = res.data
    })
    console.log(this.books.harga)
  },
  computed: {
    // Computed property untuk menyimpan produk-produk yang sesuai dengan searchTermss
    filteredBooks: function () {
      var terms = this.searchTerms.trim().toLowerCase();

      if (!this.searchTerms.length) {
        return this.books;
      }

      return this.books.filter(function (product) {
        if (product.judul_buku.toLowerCase().indexOf(terms) !== -1) {
          return product;
        }
      });
    }
  }
})