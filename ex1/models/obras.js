const mongoose= require('mongoose')

var ObrasSchema = new mongoose.Schema({

    
    _id:{type: String, required:true},
    titulo: String,
    tipo: String,
    compositor: String
})

module.exports= mongoose.model('obras', ObrasSchema)
