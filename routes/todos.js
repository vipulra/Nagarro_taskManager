const {Router} = require('express');
const { Todos , Notes } = require('./db')
const route = Router();

// <--------- Get All Todo Task------------>
route.get('/',async(req,res)=>{
    const todos = await Todos.findAll()
    res.send(todos);
})

route.get('/:id',async(req, res) => {
    if (isNaN(Number(req.params.id))) {
      return res.status(400).send({
        error: 'todo id must be an integer'
      })
    }
    const todo = await Todos.findByPk(req.params.id)

    if (!todo) {
      return res.status(404).send({
        error: 'No todo found with id = ' + req.params.id,
      })
    }
    res.send(todo)
  })

route.get('/:id/notes',async(req,res)=>{
  console.log("h");
  const notes = await Notes.findAll({
      attributes: ['descrip'], 
      where: {
            todoId: req.params.id
      }

    })
res.send(notes);
})



  route.post('/', async (req, res) => {
    if (typeof req.body.task !== 'string') {
      return res.status(400).send({ error: 'Task name not provided' })
    }

    const newTodo = await Todos.create({
        task: req.body.task,
        descrip: req.body.descrip,
        due: req.body.due,
        status: req.body.status,
        priority : req.body.priority 
    })
  
    res.status(201).send({ success: 'New task added', data: newTodo })
  })
  
  route.post('/:id/notes', async (req, res) => {
    console.log('hell');
    if (typeof req.body.descrip !== 'string') {
      return res.status(400).send({ error: 'Task name not provided' })
    }
  
    const newNote = await Notes.create({
        descrip: req.body.descrip,
        todoId : req.params.id 
    })
  
    res.status(201).send({ success: 'New task added', data: newNote })
  })

  module.exports = route
