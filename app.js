const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')

const messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: new Date()
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date()
    }
];

app.get('/', (req, res) => {
    res.render('pages/index', {
        messages,
        title: "Home Page"
    })
})
app.get('/new', (req, res) => {
    res.render('pages/new', {
        messages,
        title: "New message"
    })
})

app.listen(port, () => {
    console.log(`App listening at port ${port}`)
})