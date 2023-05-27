const express = require("express");
const server = express();
const cors = require("cors");
const Sql = require("mssql");
const port = 8000;
const { body } = require("express-validator");
server.use(cors());

//maneja el mensaje de la conexion a la base de datos
process.env.NODE_TLS_ALLOW_INSECURE_SERVER = '1';

//conexion 
const config = {
    server: "FRANCIS\\SQLEXPRESS",
    database: "PruebaReactNative",
    user: "sa",
    password: "123",
    options: {
        trustServerCertificate: true
    }
};


const Conectar = async () => {
    try {
        await Sql.connect(config);
        console.log("Conexión exitosa a la base de datos");
    } catch (err) {
        console.log("Error al conectar a la base de datos:", err);
    }
};

Conectar();

//guardar datos
server.post("/guardar", [
    body('cedula'),
    body('nombre'),
    body('apellido'),
    body('telefono'),
    body('correo'),
    body('contrasenia'),
], async (req, res) => {
    try {
      
        const pool = await Sql.connect(config);
        await pool.request()
            .input("cedula", Sql.VarChar, req.query.cedula)
            .input("nombre", Sql.VarChar, req.query.nombre)
            .input("apellido", Sql.VarChar, req.query.apellido)
            .input("telefono", Sql.VarChar, req.query.telefono)
            .input("correo", Sql.VarChar, req.query.correo)
            .input("contrasenia", Sql.VarChar, req.query.contrasenia)
            .query("INSERT INTO TbPersonas VALUES (@cedula,@nombre,@apellido,@telefono,@correo,@contrasenia)");
        res.json({
            status: true,
            cedula: req.query.cedula,
            nombre: req.query.nombre,
            apellido: req.query.apellido,
        });
        console.log("exito");
    } catch (err) {
        console.error("error ", err);
    }
});

//actualizar datos
server.put("/actualizar", [
    body('cedula'),
    body('nombre'),
    body('apellido'),
    body('telefono'),
    body('correo'),
    body('contrasenia'),
  ], async (req, res) => {
    try {
      const pool = await Sql.connect(config);
      await pool.request()
        .input("cedula", Sql.VarChar, req.query.cedula)
        .input("nombre", Sql.VarChar, req.query.nombre)
        .input("apellido", Sql.VarChar, req.query.apellido)
        .input("telefono", Sql.VarChar, req.query.telefono)
        .input("correo", Sql.VarChar, req.query.correo)
        .input("contrasenia", Sql.VarChar, req.query.contrasenia)
        .query("UPDATE TbPersonas SET nombre=@nombre, apellido = @apellido , telefono = @telefono, correo = @correo, contrasenia = @contrasenia WHERE cedula = @cedula");
  
      res.json({
        status: true,
        cedula: req.query.cedula,
        nombre: req.query.nombre,
        apellido: req.query.apellido,
      });
    } catch (err) {
      console.error("Error al actualizar datos en la base de datos:", err);
    }
  });
  

// //obtener todas las personas guardadas
server.get('/Listar', async (req, res) => {
    try {
        const pool = await Sql.connect(config);
        const result = await pool.request().query('SELECT * FROM TbPersonas');
        const personas = result.recordset;
        res.json(
            personas,
        );
    } catch (err) {
        console.error('Error al obtener la lista:', err);
    }
});

// //obtener todas las personas guardadas
server.get('/PersonaActualizar', [
    body("cedula"),
], async (req, res) => {
    try {
        const pool = await Sql.connect(config);
        const result = await pool.request().input("cedula", Sql.VarChar, req.query.cedula)
        .query('SELECT * FROM TbPersonas WHERE cedula = @cedula');
        const personas = result.recordset;
        res.json(
            personas,
        );
    } catch (err) {
        console.error('Error al obtener la lista:', err);
    }
});

// //borrar personas
server.delete('/delete', [
    body("cedula"),
], async (req, res) => {
    try {
        const pool = await Sql.connect(config);
        await pool.request().input("cedula", Sql.VarChar, req.query.cedula)
            .query("DELETE FROM TbPersonas WHERE cedula = @cedula");
        res.json({
            status: true,
            cedula: req.query.cedula
        });
        console.log('Persona eliminada');
    } catch (err) {
        console.error('Error al eliminar la persona:', err);
    }
});



//levantar el sevidor
server.listen(port,
    () => {
        console.log("servidor iniciado" + port);
    }); 