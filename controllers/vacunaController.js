// controllers/vacunaController.js
const db = require('../config/db');

// Obtener todas las vacunas
exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT * FROM vacunas`);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las vacunas' });
    }
};

// Obtener una vacuna por ID
exports.getById = async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT * FROM vacunas WHERE id = ?`, [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Vacuna no encontrada' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la vacuna' });
    }
};

// Crear una nueva vacuna
exports.create = async (req, res) => {
    try {
        const { nombre, fecha, animal_id } = req.body;
        await db.query(`INSERT INTO vacunas (nombre, fecha, animal_id) VALUES (?, ?, ?)`, [nombre, fecha, animal_id]);
        res.status(201).json({ message: 'Vacuna creada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la vacuna' });
    }
};

// Actualizar una vacuna por ID
exports.update = async (req, res) => {
    try {
        const { nombre, fecha, animal_id } = req.body;
        const [result] = await db.query(
            `UPDATE vacunas SET nombre = ?, fecha = ?, animal_id = ? WHERE id = ?`,
            [nombre, fecha, animal_id, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Vacuna no encontrada' });
        res.json({ message: 'Vacuna actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la vacuna' });
    }
};

// Eliminar una vacuna por ID
exports.delete = async (req, res) => {
    try {
        const [result] = await db.query(`DELETE FROM vacunas WHERE id = ?`, [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Vacuna no encontrada' });
        res.json({ message: 'Vacuna eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la vacuna' });
    }
};
