var Obra = require('../models/obras')
var ObjectId = require('mongodb').ObjectID

// Devolve a lista de obras musicais apenas com os campos "id", "titulo", "tipo" e "compositor"
module.exports.listar = () => {
    return Obra
        .find({}, {"_id" : true, "titulo": true , "tipo": true, "compositor":true})
        .exec()
}

// Devolve a informação completa de uma obra (considere para id o campo id que tem valores "m1", "m2", ... "mn"
module.exports.consultar = ident =>{
    return Obra
           .findOne({_id:ident})
           .exec()
}


// Devolve apenas uma lista com os nomes dos compositores, sem repetições e ordenada alfabeticamente
module.exports.listarComp = () =>{
    return Obra
           .aggregate([{$unwind: "$compositor"},{$group: {_id: "$compositor"}},{$sort: {_id: 1}}])
           .exec()
}



// Devolve uma lista de obras musicais com os seguintes campos: id, titulo, partituras (número de partituras disponíveis);
module.exports.listarObrasPartituras = () =>{
        return Obra
               .aggregate([
                       {$project: {id:true,titulo:true,partituras: { $cond: { if: { $isArray: "$instrumentos.instrumento" }, then: { $size: "$instrumentos.instrumento" }, else: {$cond: { if: { "instrumentos": {exists:true}}, then: 1, else: 0} }}}}}] )
               .exec()
 }

 // Devolve a lista de obras agrupadas por compositor, ou seja, devolve uma lista de compositores em que a cada compositor está associada uma lista de obras (coloque apenas o id e o título da obra)
 module.exports.listarObrasComp =(comp)=>{
     return Obra
            .aggregate([{$group:{_id:"$compositor", "obras":{$push:{"_id":"$_id", "titulo": "$titulo"}}}}])
            .exec()
 }

 // Devolve a lista de obras agrupadas por instrumento, ou seja, devolve uma lista de instrumentos em que a cada instrumento está associada uma lista de obras (coloque apenas o id e o título da obra)
 module.exports.listarObrasInstrumento = (instrumento) =>{
     return Obra
            .aggregate([{$unwind:"$instrumentos.instrumento"},{$group:{_id:"$instrumentos.instrumento.designacao", "obra":{$push:{"_id":"$_id", "titulo": "$titulo"}}}}])
            .exec()
 }