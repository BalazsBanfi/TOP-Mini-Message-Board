const db = require('../db/queries');
const asyncHandler = require('express-async-handler')
const { CustomDbError } = require('../errors/CustomErrors');


const getMessages = asyncHandler(async (req, res) => {
    const messages = await db.getAllMessages();
    console.log("Messages: ", messages);
    if (!messages.length) {
        throw new CustomDbError('No messages in database');
    }
    res.render("pages/index", {
        messages: messages,
        title: "Mini messageboard",
    });
})

const getNewMessage = asyncHandler(async (req, res) => {
    res.render("pages/new", {
        title: "New message",
    });
})

const getMessageById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    console.log(id, req.params.id)
    const message = await db.getMessage(id);
    console.log('message', message)
    if (!message) {
        throw new CustomDbError('No message in database');
    }
    res.render("pages/message", {
        message: message,
        title: "Selected message",
    });
})

const postNewMessage = asyncHandler(async (req, res) => {
    console.log(req.body)
    const message = req.body;
    await db.insertMessage(message);
    res.redirect("/");
    console.log("message to be saved: ", req.body.userName, req.body.userMessage);
})

const getDeleteMessages = asyncHandler(async (req, res) => {
    await db.deleteMessages();
    res.redirect("/");
    console.log("messages deleted");
})

module.exports = { getMessages, getNewMessage, getMessageById, postNewMessage, getDeleteMessages };
