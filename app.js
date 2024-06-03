const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = 4000;

// Middleware para parsear el cuerpo de la solicitud como JSON
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para servir home.html después del inicio de sesión o registro exitosos
app.get('/home.html', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

// Rutas de autenticación
app.use('/', authRoutes);

// Ruta para servir el archivo HTML del index (donde estarán los formularios de registro e inicio de sesión)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
