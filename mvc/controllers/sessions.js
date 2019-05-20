const User = require('../models').User;
module.exports = {
  new: function(req,res){
    res.render('sessions/new');
  },
  create: function(req,res){
    User.login(req.body.email,req.body.password)
    .then(user => {
      if(user){
        // guardar el id del usuario en la sesion
        req.session.userId = user.id;
      }
      res.json(user)
    }).catch(err=>{
      console.log(err);
      res.json(err)
    })
  },
  destroy: function(req,res){
    req.session.destroy(function(){
      // los redirect es por metodo GET, la ruta /sessions
      res.redirect('/sessions');
    });
  }
};
