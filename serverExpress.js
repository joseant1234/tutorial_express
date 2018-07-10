// return una funcion q al ejecutarse entrega una funcion con la q se puede configurar la aplicacion
const express = require('express');
// se da el parse pues en el cuerpo de la peticion puede traer datos en diferentes tipos de estructura (archivos, JSON, ...), por tanto se debe analizar esos datos y entregar de una manera de sencilla y uniforme, con express se debe hacer eso
const bodyParser = require('body-parser');

const app = express();
// con el obj app de express se solicita q use el analizador de bodyParser
// parte del proceso de dar respuesta a una peticion use el analizador bodyParse para que lee el cuerpo de una peticion, se pide q use el analizador q lee si viene con el formato urlencoded
// extented sirve para poder enviar parametros anidados, por tanto enviar objetos con propiedades en la peticion
app.use(bodyParser.urlencoded({extented: true}));

app.get('/saludo',function(req,res){
  // query (query params, operador ?) es un objeto q tiene los datos q se envian de la peticion
  res.send(`Hola ${req.query.name}`);
});

app.post('/saludoPost',function(req,res){
  // los parametros viene en el objeto body
  res.send(`Hola ${req.body.name}`);
})

app.listen(3000);
