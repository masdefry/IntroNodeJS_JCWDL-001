const express = require('express')
const cors = require('cors') // Library untuk memberikan izin akses client menuju ke API kita!
const fs = require('fs') // File System : Digunakan untuk membaca data dari sebuah file 

const PORT = 3003

const app = express()
app.use(cors())
app.use(express.json()) // Initialize body parser ---> Untuk menerima request.body dari frontend

app.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome to Our API</h1>')
})

app.get('/todos', (req, res) => {
    let todos = JSON.parse(fs.readFileSync('./data/todos.json'))

    res.send({
        status: 200,
        error: false, 
        message: 'Get Todos Success!',
        data: todos
    })
})

app.post('/send-todo', (req, res) => {
    // Step-1. Ambil datanya dari frontend
    let body = req.body 
    
    // Step-2. Ambil semua datanya dari todos.json
    let todos = JSON.parse(fs.readFileSync('./data/todos.json'))
    todos.push(body)

    // Step-3. Update todos.json
    fs.writeFileSync('./data/todos.json', JSON.stringify(todos))
    res.status(201).send({
        status: 201,
        error: false,
        message: 'Send Data Todo Success!',
        data: JSON.parse(fs.readFileSync('./data/todos.json'))
    })

})

app.patch('/edit-todo', (req, res) => {
    // Step-1. 
    let body = req.body 
    let id = req.query.id

    // Step-2.
    let todos = JSON.parse(fs.readFileSync('./data/todos.json'))

    // Step-3. 
    let idx = todos.findIndex(value => value.id == id)

    // Step-4. 
    todos[idx].todo = body.todo 
    todos[idx].tempat = body.tempat 

    fs.writeFileSync('./data/todos.json', JSON.stringify(todos))
    res.status(201).send({
        status: 201, 
        error: false,
        message: 'Edit Todo Success!',
        data: JSON.parse(fs.readFileSync('./data/todos.json'))
    })
})

app.delete('/delete-todo', (req, res) => {
    let id = req.query.id 

    let todos = JSON.parse(fs.readFileSync('./data/todos.json'))

    let idx = todos.findIndex(value => value.id == id)

    todos.splice(idx, 1)

    fs.writeFileSync('./data/todos.json', JSON.stringify(todos))
    res.status(201).send({
        status: 201, 
        error: false,
        message: 'Delete Todo Success!',
        data: JSON.parse(fs.readFileSync('./data/todos.json'))
    })
})

app.listen(PORT, () => console.log('API Running on Port ' + PORT))