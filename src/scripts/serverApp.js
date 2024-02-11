import express from 'express';
import cors from 'cors';
import multer from 'multer';

const app = express();
const PORT = 3000;

// Habilitar CORS
app.use(cors());

// Configurar multer para manejar archivos en la solicitud POST
const upload = multer({
    dest: 'uploads/'
});

// Ruta para recibir archivos HTML mediante una solicitud POST
app.post('/api/upload', upload.single('archivo'), (req, res) => {
    try {
        const file = req.file; // Obtener el archivo del cuerpo de la solicitud
        console.log('Archivo recibido:', file);
        res.status(200).send('Archivo recibido correctamente'); // Enviar una respuesta de éxito
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