// scripts/setup-db.mts
import { readFileSync } from "node:fs";
import Database from "better-sqlite3";

let file = "tasko.db";
if (process.env.DATABASE_FILE) {
  file = process.env.DATABASE_FILE;
}

const sqlite = new Database(file);
const sql = readFileSync("scripts/schema.sql", "utf8");

sqlite.exec(sql);
sqlite.close();

console.log(`${file}에 테이블과 예시 데이터를 만들었다.`);
