import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

const here = fileURLToPath(new URL('.', import.meta.url));
const schemaPath = new URL('./Reservation-Practice.sql', import.meta.url);
const queryPath = new URL('./Reservation-SQL-Query.sql', import.meta.url);
const schema = readFileSync(schemaPath, 'utf8');
const query = readFileSync(queryPath, 'utf8').trim();

if (!/^SELECT\b/i.test(query)) {
  console.error('Runner chỉ cho phép một câu SELECT để bảo vệ fixture học tập.');
  process.exitCode = 1;
} else {
  const db = new DatabaseSync(':memory:');
  try {
    db.exec(schema);
    const rows = db.prepare(query).all();
    console.log(`Fixture: ${here}`);
    console.log(`Số dòng: ${rows.length}`);
    console.table(rows);
  } catch (error) {
    console.error(`Không chạy được truy vấn: ${error.message}`);
    process.exitCode = 1;
  } finally {
    db.close();
  }
}
