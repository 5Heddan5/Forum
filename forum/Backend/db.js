import betterSqlite3 from "better-sqlite3";
import path from "path";

// Skapa och exportera en synkron databasanslutning
const db = betterSqlite3(path.join(process.cwd(), "Forum.db"));

export default db;
