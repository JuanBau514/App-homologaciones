const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Permitir todas las solicitudes CORS
app.use(cors());

const {
  scraping_info_estudiante,
  scraping_materias,
  compararMaterias,
} = require('./scrap_init');

app.get('/api/estudiante', async (req, res) => {
  try {
    const datosEstudiante = await scraping_info_estudiante();
    res.json(datosEstudiante);
  } catch (error) {
    console.error('Error al obtener datos del estudiante:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/api/materias', async (req, res) => {
  try {
    const datosMaterias = await scraping_materias();
    res.json(datosMaterias);
  } catch (error) {
    console.error('Error al obtener datos de materias:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/api/comparar', (req, res) => {
  try {
    const infoMaterias = require('./materias_estudiante.json');
    const materiasTecno_239 = require('./planEstudio239.json');
    const resultado = compararMaterias(infoMaterias, materiasTecno_239);
    res.json(resultado);
  } catch (error) {
    console.error('Error al comparar materias:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
