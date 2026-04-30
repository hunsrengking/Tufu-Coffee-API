import pool from '../src/config/db.js';
import User from '../src/feature/user/models/user.model.js';
import Role from '../src/feature/user/models/role.model.js';

async function seed() {
  try {
    // 1. Ensure roles are seeded (though init_db.sql should have done it)
    await pool.query("INSERT INTO roles (name, description) VALUES ('Admin', 'System Administrator') ON CONFLICT DO NOTHING");
    await pool.query("INSERT INTO roles (name, description) VALUES ('User', 'Standard User') ON CONFLICT DO NOTHING");

    // 2. Get the role IDs
    const { rows: adminRoles } = await pool.query("SELECT id FROM roles WHERE name = 'Admin'");
    const { rows: userRoles } = await pool.query("SELECT id FROM roles WHERE name = 'User'");
    const adminRoleId = adminRoles[0].id;
    const userRoleId = userRoles[0].id;

    // 3. Create a test user
    const testUser = {
        username: 'admin',
        email: 'admin@example.com',
        password: 'adminpassword123',
        role_id: adminRoleId
    };

      const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [testUser.email]);
      if (existingUser.rows.length === 0) {
        const newUser = await User.create(testUser);
      console.log('Test user created successfully:', newUser);
      } else {
      console.log('User already exists:', existingUser.rows[0].email);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error seeding user:', error);
    process.exit(1);
  }
}

seed();
