const pool = require('./pool');

const getAllMessages = async () => {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

const getMessage = async (messageId) => {
  const { rows } = await pool.query(`SELECT * FROM messages WHERE id=${messageId};`);
  return rows;
}

const insertMessage = async (message) => {
  await pool.query(`INSERT INTO messages (username, text, added) VALUES ($1, $2, CURRENT_DATE)`, [message.userName, message.userMessage]);
}

const deleteMessage = async () => {
  await pool.query("DELETE FROM messages");
}

module.exports = {
  getAllMessages,
  insertMessage,
  getMessage,
  deleteMessage
};
