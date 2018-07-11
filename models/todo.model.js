var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ToDoSchema = new mongoose.Schema({
    status: String,
    description: String
})

ToDoSchema.plugin(mongoosePaginate)
const ToDo = mongoose.model('Todo', ToDoSchema)

module.exports = ToDo;