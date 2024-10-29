// index.js
const express = require('express');
const app = express();
const animalRoutes = require('./routes/animalRoutes');
const vacunaRoutes = require('./routes/vacunaRoutes');
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/animales', animalRoutes);
app.use('/api/vacunas', vacunaRoutes);

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
