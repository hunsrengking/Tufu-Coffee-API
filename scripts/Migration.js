import 'dotenv/config';
import pool from '../src/config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from '../src/utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initializeDatabase() {
  try {
    logger.info('Starting database initialization...');

    // Read the SQL initialization file
    const sqlFile = path.join(__dirname, 'Migration.sql');
    const sql = fs.readFileSync(sqlFile, 'utf-8');

    // Split queries by semicolon and execute
    const queries = sql
      .split(';')
      .map(query => query.trim())
      .filter(query => query.length > 0);

    for (const query of queries) {
      try {
        await pool.query(query);
        logger.info(`Executed: ${query.substring(0, 50)}...`);
      } catch (err) {
        // Log but continue for idempotent operations (CREATE TABLE IF NOT EXISTS)
        if (!err.message.includes('already exists')) {
          logger.warn(`Query warning: ${err.message}`);
        }
      }
    }

    logger.info('Database initialization completed successfully');
    process.exit(0);
  } catch (err) {
    logger.error('Database initialization failed:', err);
    process.exit(1);
  }
}

initializeDatabase();
