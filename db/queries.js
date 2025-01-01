const pool = require("./pool");
const asyncHandler = require("express-async-handler");
const { CustomDbError } = require("../errors/CustomErrors");

const getAllMessages = async () => {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
};

const getMessage = async (messageId) => {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id= $1", [
    messageId,
  ]);
  return rows[0];
};

const insertMessage = async (username, text, date) => {
  await pool.query(
    "INSERT INTO messages (username, text, added) VALUES ($1, $2, $3)",
    [username, text, date]
  );
};

const deleteMessageById = asyncHandler(async (messageId) => {
  await pool.query("DELETE FROM messages WHERE id = $1", [messageId]);
});

const deleteMessages = asyncHandler(async () => {
  await pool.query("DELETE FROM messages");
});

module.exports = {
  getAllMessages,
  insertMessage,
  getMessage,
  deleteMessageById,
  deleteMessages,
};
