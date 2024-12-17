const { Router } = require("express");
const messageRouter = Router();
const messageControllers = require("../controllers/messageController");

messageRouter.get("/", messageControllers.getMessages);
messageRouter.get("/new", messageControllers.getNewMessage)
messageRouter.post("/new", messageControllers.postNewMessage)
messageRouter.get("/delete", messageControllers.getDeleteMessages)
messageRouter.get("/:id", messageControllers.getMessageById)

module.exports = messageRouter;