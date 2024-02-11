import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs/promises';
import {
    scraping_info_estudiante
} from './scraping.js';

const app = express();
const PORT = 3000;

// Habilitar CORS
app.use(cors());

// Configurar multer para manejar archivos en la solicitud POST
const upload = multer({
    dest: 'uploads/'
});

// Ruta para recibir archivos HTML mediante una solicitud POST
app.post('/api/upload', upload.single('archivo'), async (req, res) => {
    try {
        const file = req.file; // Obtener el archivo del cuerpo de la solicitud
        const htmlContent = await fs.readFile(file.path, {
            encoding: 'utf-8'
        }); // Leer el contenido del archivo
        const datosEstudiante = await scraping_info_estudiante(htmlContent);
        console.log('Datos del estudiante:', datosEstudiante);
        res.status(200).send('Archivo recibido y scraping realizado correctamente'); // Enviar una respuesta de éxito
    } catch (error) {
        console.error('Error al procesar el archivo:', error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});