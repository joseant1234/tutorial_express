const User = require('../models').User;

module.exports = function(req, res, next){
  if(!req.session.userId) return next();
  // se usa association pues es una colección la relacion a enviar en User
  User.findById(req.session.userId,{
    include: [
      {
        association: 'tasks'
      }
    ]
  }).then(user =>{
    if(user){
      req.user = user;
      next();
    }
  })

}
