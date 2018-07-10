const sqlite3 = require('sqlite3');
// abre la conexion de manera automatica con sqlite3 al crear un objeto de control en la bd
// si se crea new sqlite3.Database('memory'); se guarda en la memoria RAM, por tanto solo son persistente mientras el programa este corriendo
let db = new sqlite3.Database('proyecto-backend');

// se va a ejecutar en la bd
db.run('CREATE TABLE tasks(id int AUTO_INCREMENT, description varchar(255))');

// se cierra la conexion para evitar fugas de memoria q afecte el rendimiento de la pc
db.close();
