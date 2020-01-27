const express = require('express');
const router = express.Router();

var Obra = require('../controllers/obras')

/* GET users listing. */
router.get('/obras/:id', function(req, res, next) {
  Obra.consultar(req.params.id)
  .then(dados => {console.log(dados);res.jsonp(dados)})
  .catch(erro => {console.log(erro); res.status(500).jsonp(erro)})

});

router.get('/obras',function(req,res,next){
  if(req.query.compositor){
    Obra.listarObrasComp(req.query.compositor)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
  }
  else if(req.query.instrumento){
    Obra.listarObrasInstrumento(req.query.instrumento)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))

  }
  else{
    Obra.listar()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
  }

  });



router.get('/obrasQuant', function(req, res, next) {
  Obra.listarObrasPartituras()
  .then(dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))

  });

  router.get('/compositores',function(req,res,next){
    Obra.listarComp()
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
  })
  
  


  module.exports = router