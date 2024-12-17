const { getDeleteMessages } = require('../../postgresql-tutorial/controllers/userController');
const pool = require('./pool');

const getAllMessages = async () => {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

const insertMessage = async (message) => {
  await pool.query("INSERT INTO messages (username) VALUES ($1)", [username]);
}

const deleteMessage = async () => {
  await pool.query("DELETE FROM messages");
}

module.exports = {
  getAllMessages,
  insertMessage,
  deleteMessage
};