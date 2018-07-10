const http = require('http');

function responderPeticion(request,response){
  // se cierra la conexion http con un mensaje de Hola
  response.end('Hola');
}

// cada vez q recibe una peticion http llama a la funcion responderPeticion y provee de 2 argumentos request y response
// createServe guarda y cada peticion ejecuta con eso 2 argumentos
let server = http.createServer(responderPeticion);

// el servidor se pone en escucha
server.listen(3000);
