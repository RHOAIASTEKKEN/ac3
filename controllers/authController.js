const mysql = require('mysql');
const qrCode = require('qrcode');

const connection = mysql.createConnection({
    host: '154.49.142.52',
    user: 'u811460462_java',
    password: '1m*I]4$C+K9',
    database: 'u811460462_java',
    port: 3306
});

exports.showLoginForm = (req, res) => {
    res.send('Mostrar formulario de inicio de sesión');
};

exports.login = (req, res) => {
    const { usuario, contrasena } = req.body;

    connection.query('SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?', [usuario, contrasena], (err, result) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            res.send('Error al iniciar sesión');
            return;
        }

        if (result.length > 0) {
            const userData = result[0];
            res.redirect(`/home.html?nombre=${userData.nombre}&usuario=${userData.usuario}&qr=${userData.codigo_qr}`);
        } else {
            res.send('Credenciales incorrectas');
        }
    });
};

exports.showRegisterForm = (req, res) => {
    res.send('Mostrar formulario de registro');
};

exports.registerUser = (req, res) => {
    const { nombre, correo, telefono, tutor, correo_tutor, telefono_tutor, usuario, contrasena } = req.body;

    const qrData = `Usuario: ${usuario}, Nombre: ${nombre}`;
    qrCode.toDataURL(qrData, (err, url) => {
        if (err) {
            console.error('Error al generar el código QR:', err);
            res.send('Error al registrar el usuario');
            return;
        }

        connection.query('INSERT INTO usuarios (nombre, correo, telefono, tutor, correo_tutor, telefono_tutor, usuario, contrasena, codigo_qr) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre, correo, telefono, tutor, correo_tutor, telefono_tutor, usuario, contrasena, url], (err, result) => {
            if (err) {
                console.error('Error al insertar datos:', err);
                res.send('Error al registrar el usuario');
                return;
            }

            res.redirect('/index.html'); // Redirige al usuario a home.html después del registro exitoso
        });
    });
};
