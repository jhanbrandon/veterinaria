// routes/animalRoutes.js
const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');

router.get('/', animalController.getAll);           // Obtener todos los animales
router.get('/:id', animalController.getById);       // Obtener animal por ID
router.post('/', animalController.create);          // Crear nuevo animal
router.put('/:id', animalController.update);        // Actualizar animal por ID
router.delete('/:id', animalController.delete);     // Eliminar animal por ID

module.exports = router;
