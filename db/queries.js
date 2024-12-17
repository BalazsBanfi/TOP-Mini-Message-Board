const pool = require('./pool');

const getAllMessages = async () => {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

const getMessage = async (messageId) => {
  console.log(messageId, typeof (Number(messageId)))

  //  const { message } = await pool.query(`SELECT * FROM messages WHERE id='1';`);
  const { message } = await pool.query(`SELECT * FROM messages WHERE username='Bryan'`);
  console.log(messageId, message)
  return message;
}

const insertMessage = async (message) => {
  await pool.query(`INSERT INTO messages (username, text, added) VALUES ('${message.userName}', '${message.userMessage}', CURRENT_DATE)`);
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
