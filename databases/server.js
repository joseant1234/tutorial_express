const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
// abre la conexion de manera automatica con sqlite3 al crear un objeto de control en la bd
// si se crea new sqlite3.Database('memory'); se guarda en la memoria RAM, por tanto solo son persistente mientras el programa este corriendo
let db = new sqlite3.Database('proyecto-backend');

// se va a ejecutar en la bd, si se ejecuta otra vez data error, pues la tabla se crea una vez
// db.run('CREATE TABLE tasks(id int AUTO_INCREMENT, description varchar(255))');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.post('/pendientes',function(req,res){
  db.run("INSERT INTO tasks(description) VALUES('Hola')");
  res.send('Insercion realizada');
});

// se cierra la conexion para evitar fugas de memoria q afecte el rendimiento de la pc
// si se pone en el script, se cerraria antes de estar a la escucha de peticiones
// db.close();

app.listen(3000)

// permite escuchar eventos relacioens al proceso
// en unix cada vez q se ejecuta un programa se crea un proceso del sistema operativo para el programa, este proceso esta en ejecucion y se encarga del control del código
// el proceso puede recibir mensajes del exterior, como CTRL+C para cerrar el servidor
// SIGINT es el CTRL+C, evento
process.on('SIGINT',function(){
  console.log('Se cerro el servidor');
  db.close();
  // para evitar interrumpir el flujo de cerrar servidor se coloca la instruccion process.exit() q cierra el servidor
  // process.exit() permite cerrar el servidor de node de manera independiente de donde se ejecuta (como una ruta para cerrar el servidor)
  process.exit();
})
