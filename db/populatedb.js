#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ),
  text VARCHAR ( 1024 ),
  added DATE
);

INSERT INTO messages (username, text, added) 
VALUES ('Bryan', 'Hi there', '2024-12-13');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    ssl: true
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();