const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Ubah jika menggunakan password
    database: 'peminjaman_buku'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Koneksi ke database berhasil!');
});

module.exports = db;

