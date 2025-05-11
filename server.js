const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());

function handleDisconnect() {
  const db = mysql.createConnection({
    host: "db", 
    user: "root",
    password: "12345",
    database: "ejemplo"
  });

  db.connect((err) => {
    if (err) {
      console.error("Error conectando a la base de datos:", err);
      setTimeout(handleDisconnect, 2000); 
    } else {
      console.log("Conexión exitosa a la base de datos.");
    }
  });

  db.on("error", (err) => {
    console.error("Error en la conexión:", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect(); 
    } else {
      throw err;
    }
  });

  return db;
}

const db = handleDisconnect();

app.get("/", (req, res) => {
  console.log("Conectando a la base de datos...");

  db.query("SELECT * FROM usuarios", (err, results) => {
    if (err) {
      console.error("Error en la consulta:", err.code, err.message);
      return res.status(500).json({
        error: "Error en la base de datos",
        details: err.message
      });
    }

    console.log("Consulta exitosa:", results);
    res.json(results);
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http:localhost:${port}`);
});