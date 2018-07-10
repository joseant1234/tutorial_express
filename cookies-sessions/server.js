const express = require('express');
const cookieSession = require('cookie-session');


const app = express();

// el manejador de cookieSession es un middleware q se encarga de encryptar las cookies para guardarlas en el navegador, de extract de cada peticion http y desencriptarlas para manejarlas.
// por defecto tiene un nombre la cookie (session), pero se puede modificar
// en keys se debe enviar valores (claves) para firmar la cookie
// usa el primer valor del arreglo para firmar, los otros valores los usan para verificar las cookies y rotar las llavves haciendo mas complicado encontrar la llave y vulnerar la aplicacion
app.use(cookieSession({
  name: 'session',
  keys: ['adsadadsadsad','dasda','kdsaodsadsad']
}));
// con cookieSession se pone en el obj req el obj session

app.get('/',function(req,res){
  req.session.visits = req.session.visits || 0;
  req.session.visits = req.session.visits + 1;

  res.send(`${req.session.visits} visita(s)`);
});

app.listen(3000);
