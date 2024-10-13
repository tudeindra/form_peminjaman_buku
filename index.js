const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./koneksi');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Menggunakan folder public untuk file HTML

// Endpoint untuk menyimpan data peminjaman
app.post('/api/peminjaman', (req, res) => {
    const { nama_peminjam, nim_mahasiswa, judul_buku } = req.body;

    const query = 'INSERT INTO peminjaman (nama_peminjam, nim_mahasiswa, judul_buku) VALUES (?, ?, ?)';
    db.query(query, [nama_peminjam, nim_mahasiswa, judul_buku], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Terjadi kesalahan', error: err });
        }
        res.status(200).json({ message: 'Peminjaman buku berhasil!' });
    });
});

// Endpoint untuk mendapatkan semua data peminjaman
app.get('/api/peminjaman', (req, res) => {
    const query = 'SELECT * FROM peminjaman';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Terjadi kesalahan', error: err });
        }
        res.status(200).json(results);
    });
});

// Endpoint untuk menghapus data peminjaman berdasarkan ID
app.delete('/api/peminjaman/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM peminjaman WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Terjadi kesalahan', error: err });
        }
        res.status(200).json({ message: 'Data peminjaman berhasil dihapus!' });
    });
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
