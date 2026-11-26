// lib/db.ts
import Database from "better-sqlite3";
import { Kysely, SqliteDialect } from "kysely";
import type { DB } from "@/lib/db-types";

const globalForDb = globalThis as unknown as { db?: Kysely<DB> };

function createDb(): Kysely<DB> {
  let file = "tasko.db";
  if (process.env.DATABASE_FILE) {
    file = process.env.DATABASE_FILE;
  }
  const sqlite = new Database(file);
  sqlite.pragma("foreign_keys = ON");
  return new Kysely<DB>({
    dialect: new SqliteDialect({ database: sqlite }),
  });
}

let dbClient = globalForDb.db;
if (!dbClient) {
  dbClient = createDb();
}

export const db = dbClient;

if (process.env.NODE_ENV !== "production") {
  globalForDb.db = db;
}
