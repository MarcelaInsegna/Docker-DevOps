const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 5000;

// Configurar la conexión a la base de datos
const db = mysql.createConnection({
  host: "db_container_name", // Nombre del contenedor de MySQL
  user: "root",
  password: "tu_contraseña",
  database: "tu_base_de_datos"
});

db.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos:", err);
  } else {
    console.log("Conexión a la base de datos exitosa.");
  }
});

// Endpoint para obtener los registros de la tabla
app.get("/", (req, res) => {
  db.query("SELECT * FROM tu_tabla", (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
