const { Router } = require("express");
const messageRouter = Router();
const messageControllers = require("../controllers/messageController");

messageRouter.get("/", messageControllers.getMessages);
messageRouter.get("/new", messageControllers.getNewMessage);
messageRouter.post("/new", messageControllers.postNewMessage);
messageRouter.get("/delete", messageControllers.getDeleteMessages);
messageRouter.get("/message/:id", messageControllers.getMessageById);
messageRouter.get(
  "/message/:id/delete",
  messageControllers.getDeleteMessageById
);

module.exports = messageRouter;