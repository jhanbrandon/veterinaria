// routes/vacunaRoutes.js
const express = require('express');
const router = express.Router();
const vacunaController = require('../controllers/vacunaController');

router.get('/', vacunaController.getAll);           // Obtener todas las vacunas
router.get('/:id', vacunaController.getById);       // Obtener vacuna por ID
router.post('/', vacunaController.create);          // Crear nueva vacuna
router.put('/:id', vacunaController.update);        // Actualizar vacuna por ID
router.delete('/:id', vacunaController.delete);     // Eliminar vacuna por ID

module.exports = router;
