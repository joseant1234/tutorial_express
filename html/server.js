// el nombre de la libreria se pone en el require de js
const express = require('express');

const app = express();

// por lo general los motores de vista esperan q los archvios esten dentro de una carpeta llamada views
app.set('view engine','ejs');

// monta el servidor de archivos estaticos (css, js,...), dichos archivos se estan definiendo en la carpeta assets, ya se pueden descargar domain/style.css, son archivos q no se van a modificar solo el cliente los va solicitar
// app.use inserta un nuevo middleware en el stack de middleware del framework
// si en el middleware se pone /assets, los archivos se podran acceder desde la ruta domain/public/nombreArchivo
// con los archivos estaticos no es necesario reiniciar el servidor, pues no pasan por este de manera directa, el servidor no los construye cuando se ejecuta el mismo servidor, sino cada vez q son solicitados, son leidos de la pc y son enviados hacia el cliente
app.use('/public',express.static('assets'));


app.get('/html',function(req,res){
  // para enviar un documento html se puede usar el metodo sendFile
  // se puede enviar una ruta absoluta (desde la carpeta raiz de la pc hasta el archivo) o con un JSON de options la ruta del proyecto
  // nodejs provee de una variable llamada __dirname q contiene la ruta absoluta del proyecto
  // res.send(__dirname);
  res.sendFile('index.html',{
    root: __dirname
  });
});

app.get('/',function(req,res){
  // render es el metodo q sirve para enviar la vista luego de configurar un motor de vistas
  // no se especifia la ruta del archivo, pues el motor de vista se encarga de realizar eso
  res.render('index');
});

app.listen(3000);
