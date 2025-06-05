const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Autoriser les requêtes depuis le front
app.use(cors());
app.use(express.static('public'));

// Stockage des images dans public/uploads/events
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/events');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Aucun fichier reçu' });
  }

  const filename = req.file.filename;
  res.json({ url: `/uploads/events/${filename}`, filename });
});

app.listen(PORT, () => {
  console.log(`Serveur backend actif sur http://localhost:${PORT}`);
});
