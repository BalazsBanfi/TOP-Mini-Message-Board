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
    console.log(req.params.id)
    const messageById = await db.getMessage(req.params.id);
    if (typeof messageById[0] != "undefined") {
        console.log('req params: ', req.params, 'id: ', req.params.id, 'message: ', messageById);
        res.render("pages/message", {
            messages: messageById[0],
            title: "Selected message",
        });
    } else {
        throw new CustomDbError('No message in database');
    }
})

const postNewMessage = asyncHandler(async (req, res) => {
    const message = req.body;
    await db.insertMessage(message);
    res.redirect("/");
})

const getDeleteMessages = asyncHandler(async (req, res) => {
    await db.deleteMessages();
    res.redirect("/");
})

module.exports = { getMessages, getNewMessage, getMessageById, postNewMessage, getDeleteMessages };
