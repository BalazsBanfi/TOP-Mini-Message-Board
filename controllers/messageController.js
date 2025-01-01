const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { CustomDbError } = require("../errors/CustomErrors");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const lengthMessageErr = "must be maximum 200 characters.";

const validateUser = [
  body("userName")
    .trim()
    .notEmpty()
    .withMessage("Username can not be empty.")
    .isAlpha()
    .withMessage(`Username ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Username ${lengthErr}`),
  body("userMessage")
    .trim()
    .notEmpty()
    .withMessage("Message can not be empty.")
    .isLength({ max: 200 })
    .withMessage(`Message ${lengthMessageErr}`),
];

const getMessages = asyncHandler(async (req, res) => {
  const messages = await db.getAllMessages();
  if (!messages.length) {
    throw new CustomDbError("No messages in database");
  }
  res.render("pages/index", {
    messages: messages,
    title: "Mini messageboard",
  });
});

const getNewMessage = (req, res) => {
  res.render("pages/new", {
    title: "New message",
  });
};

const getMessageById = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    throw new CustomDbError("No message in database");
  }
  const message = await db.getMessage(id);
  if (message == undefined) {
    throw new CustomDbError("No message in database");
  }
  res.render("pages/message", {
    messages: message,
    title: "Selected message",
  });
});

const postNewMessage = [
  validateUser,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("pages/new", {
        title: "New message",
        errors: errors.array(),
      });
    } else {
      const { userName, userMessage } = req.body;
      await db.insertMessage(userName, userMessage, new Date());
      res.redirect("/");
    }
  }),
];

const getDeleteMessageById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await db.deleteMessageById(id);
  res.redirect("/");
});

const getDeleteMessages = asyncHandler(async (req, res) => {
  await db.deleteMessages();
  res.redirect("/");
});

module.exports = {
  getMessages,
  getNewMessage,
  getMessageById,
  postNewMessage,
  getDeleteMessageById,
  getDeleteMessages,
};
