import 'dotenv/config';
import pool from '../src/config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from '../src/utils/logger.js';
import UserService from '../src/feature/user/services/user.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seedDatabase() {
  try {
    logger.info('Starting database seeding...');

    // 1. Run SQL seeds 
    const sqlFile = path.join(__dirname, 'Seed.sql');
    if (fs.existsSync(sqlFile)) {
      const sql = fs.readFileSync(sqlFile, 'utf-8');
      if (sql.trim()) {
        const queries = sql.split(';').map(q => q.trim()).filter(q => q.length > 0);
        for (const query of queries) {
          try {
            await pool.query(query);
          } catch (err) {
            logger.warn(`Seed query warning: ${err.message}`);
          }
        }
        logger.info('SQL seeding completed.');
      }
    }

    // 2. Create Admin User via Service
    try {
      logger.info('Creating Admin user via UserService...');
      
      // Get Admin Role ID
      const { rows: roleRows } = await pool.query("SELECT id FROM roles WHERE name = 'Admin' LIMIT 1");
      if (roleRows.length === 0) {
        throw new Error("Admin role not found. Please run migrations first.");
      }
      const adminRoleId = roleRows[0].id;

      await UserService.createUser({
        username: 'Admin',
        email: 'admin@gmail.com',
        password: '123',
        role_id: adminRoleId
      });
      
      logger.info('Admin user created successfully.');
    } catch (err) {
      if (err.name === 'UserAlreadyExistsException' || err.message.includes('already exists')) {
        logger.info('Admin user already exists, skipping creation.');
      } else {
        logger.warn(`Failed to create Admin user: ${err.message}`);
      }
    }

    logger.info('Database seeding completed successfully');
    process.exit(0);
  } catch (err) {
    logger.error('Database seeding failed:', err);
    process.exit(1);
  }
}

seedDatabase();
