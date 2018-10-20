'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password_hash: DataTypes.STRING,
    password: DataTypes.VIRTUAL
  }, {});
  User.login = function(email,password){
    // buscar el usuario
    // el return de la promesa es User.findOne, tambien return otra promesa user.authetnicatePassword, el cual return una promesa con un valor boolean y esta return de un promesa con el valor del usuario
    return User.findOne({
      where: {
        email
      }
    }).then(user=>{
      if(!user) return null;
      return user.authenticatePassword(password).then(valid=>{
        // utilizando operadores ternarios
        // then(valid=> valid ? user : null);
        if(valid) return user;
        return null;
      });
    })
  };
  // para los metodos de instancia se usa prototype de JS
  // authenticatePassword return una promesa
  User.prototype.authenticatePassword = function(password){
    // debido a q la ejecucion de la funcion es asincrona, se va a rodear con una promesa
    return new Promise((res,rej)=>{
      // passwordTextPlano,hashPassword, callback con la comparacion hecha entre passwordTextPlano en hashPassword
      bcrypt.compare(password,this.password_hash,function(err,valid){
        if(err) return rej(err);
        res(valid);
      });
    })
  }

  User.associate = function(models) {
    // associations can be defined here
  };
  // cuando en un hook se va utilizar operaciones asincronas como la de bcrypt, se debe hacer return una promesa del metodo, de esta manera sequelize podra conocer q es una operacion asincrona y esperara q la promesa para continuar
  // si no se hace un return de una promesa, sequelize ejecutara el hook sin q de manera necesaria halla terminado la operacion asincrona
  // con la promesa sequelzie va esperar q el proceso asincorno termine para dar por finalizado el hook
  User.beforeCreate(function(user,options){
    return new Promise((res,rej)=>{
      if(user.password){
        // texto a hashear, numero de rondas q se llevaran a cabo para obtner un hash seguro, callback en q se recibira el valor hash del texto enviado
        bcrypt.hash(user.password,10,function(error,hash){
          user.password_hash = hash;
          // con esto se marca para dar por temrinado la promesa y por tanto sequelzie pueda continuar con sus operaciones
          res();
        })
      }
    });
  });
  return User;
};