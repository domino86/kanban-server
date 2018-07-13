var ToDo = require('../models/todo.model')

_this = this

exports.getTodos = async function(query, page, limit, sort){
  var options = {
    page,
    limit,
    sort
  }
  try {
    var todos = await ToDo.paginate(query, options)
    return todos;
  } catch (e) {
    throw Error('Error while Paginating Todos')
  }
}

exports.getTodo = async function(query){
  try {
    var todo = await ToDo.paginate(query)
    return todo;
  } catch (e) {
    throw Error('Error while getting Todo')
  }
}

exports.createTodo = async function(todo){

  var newTodo = new ToDo({
    status: todo.status,
    description: todo.description,
    sort: todo.sort
  })

  console.log(newTodo);
  try{
    var savedTodo = await newTodo.save()
    return savedTodo;
  }catch(e){
    throw Error("Error while Creating Todo")
  }
}

exports.updateTodo = async function(todo){
  var id = todo.id

  try {
    var oldTodo = await ToDo.findById(id);
  } catch(e){
    throw Error("Error occured while Finding the Todo")
  }

  if (!oldTodo){
    return false;
  }

  oldTodo.description = todo.description
  oldTodo.status = todo.status
  oldTodo.sort = todo.sort

  try {
    var savedTodo = await oldTodo.save()
    return savedTodo;
  } catch(e) {
    throw Error("And Error occured while updating the Todo");
  }
}

exports.deleteTodo = async function(id){

  try {
    var deleted = await ToDo.remove({_id: id})
    if(deleted.result.n === 0){
      throw Error("Todo Could not be deleted")
    }
    return deleted
  } catch(e) {
    throw Error("Error Occured while Deleting the Todo")
  }
}