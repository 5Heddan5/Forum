import Database from "better-sqlite3";

// Skapa en databas som heter "forum.db"
const db = new Database("./Forum.db", { verbose: console.log });

// Exportera db för användning i andra filer
export default db;
