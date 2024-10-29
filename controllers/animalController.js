// controllers/animalController.js
const db = require('../config/db');

// Obtener todos los animales
exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT * FROM animales`);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los animales' });
    }
};

// Obtener un animal por ID
exports.getById = async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT * FROM animales WHERE id = ?`, [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Animal no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el animal' });
    }
};

// Crear un nuevo animal
exports.create = async (req, res) => {
    try {
        const { nombre, especie, edad } = req.body;
        await db.query(`INSERT INTO animales (nombre, especie, edad) VALUES (?, ?, ?)`, [nombre, especie, edad]);
        res.status(201).json({ message: 'Animal creado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el animal' });
    }
};

// Actualizar un animal por ID
exports.update = async (req, res) => {
    try {
        const { nombre, especie, edad } = req.body;
        const [result] = await db.query(
            `UPDATE animales SET nombre = ?, especie = ?, edad = ? WHERE id = ?`,
            [nombre, especie, edad, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Animal no encontrado' });
        res.json({ message: 'Animal actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el animal' });
    }
};

// Eliminar un animal por ID
exports.delete = async (req, res) => {
    try {
        const [result] = await db.query(`DELETE FROM animales WHERE id = ?`, [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Animal no encontrado' });
        res.json({ message: 'Animal eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el animal' });
    }
};
