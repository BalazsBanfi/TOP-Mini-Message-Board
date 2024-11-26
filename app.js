const express = require('express')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }));
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
        messages: messages,
        title: "Mini messageboard"
    })
})
app.get('/new', (req, res) => {
    res.render('pages/form', {
        messages: messages,
        title: "New message"
    })
})

app.get('/:id', (req, res) => {
    if (messages[req.params.id] !== undefined) {
        res.render('pages/message', {
            messages: messages,
            title: "One message",
            messageId: req.params.id
        })
    } else {
        res.render('pages/404')
    }
}
)

app.post('/new', (req, res) => {
    let userMessage = req.body.userMessage;
    let userName = req.body.userName;
    messages.unshift({ text: userMessage, user: userName, added: new Date() });
    res.redirect('/')
})


app.listen(port, () => {
    console.log(`App listening at port ${port}`)
})