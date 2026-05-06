-- Create initial tables for User, Role, and Permission

CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS permissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  resource VARCHAR(100) NOT NULL,
  action VARCHAR(100) NOT NULL,
  group_name VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS role_permissions (
  role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
  permission_id INTEGER REFERENCES permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  recovery_email VARCHAR(100),
  password VARCHAR(255) NOT NULL,
  password_decrypted VARCHAR(255) NOT NULL,
  role_id INTEGER REFERENCES roles(id) ON DELETE SET NULL,
  employee_id INTEGER REFERENCES employees(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT TRUE,
  is_locked BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  failed_login INTEGER DEFAULT 0,
  otp VARCHAR(255),
  otp_expire TIMESTAMP NULL,
  last_login TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL
);


CREATE TABLE IF NOT EXISTS offices (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT,
  phone VARCHAR(20),
  email VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS positions(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS departments(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS employees (
  id SERIAL PRIMARY KEY,
  office_id INTEGER REFERENCES offices(id) ON DELETE SET NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  position_id INTEGER REFERENCES positions(id) ON DELETE SET NULL,
  department_id INTEGER REFERENCES departments(id) ON DELETE SET NULL,
  salary DECIMAL(10, 2),
  JoinOn_date DATE ,
  is_active BOOLEAN DEFAULT TRUE,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS configurations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  value TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS codes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS codes_values (
  id SERIAL PRIMARY KEY,
  code_id INTEGER REFERENCES codes(id) ON DELETE CASCADE,
  value VARCHAR(255) NOT NULL,
  label VARCHAR(255),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS clients (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  recovery_email VARCHAR(100) UNIQUE NULL,
  phone VARCHAR(13) NOT NULL,
  password VARCHAR(255) NOT NULL,
  last_password_reset TIMESTAMP NULL,
  signup_on_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  status_id INTEGER REFERENCES status(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS discounts (
  id SERIAL PRIMARY KEY,
  discount_type_id INTEGER REFERENCES codes_values(id) ON DELETE SET NULL,
  total_value DECIMAL(10, 2) NOT NULL,
  start_date DATE, 
  end_date DATE,
  status_id INTEGER REFERENCES status(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  discount_id INTEGER REFERENCES discounts(id) ON DELETE SET NULL,
  image_url TEXT,
  selling_count INTEGER NOT NULL DEFAULT 0,
  status_id INTEGER REFERENCES status(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  client_id INTEGER REFERENCES clients(id) ON DELETE SET NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  discount_amount DECIMAL(10, 2) DEFAULT 0,
  final_amount DECIMAL(10, 2) NOT NULL,
  order_status_id INTEGER REFERENCES status(id) ON DELETE SET NULL,
  payment_status_id INTEGER REFERENCES status(id) ON DELETE SET NULL,
  order_type_id INTEGER REFERENCES status(id) ON DELETE SET NULL,
  table_number VARCHAR(10),
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders_history (
  id SERIAL PRIMARY KEY,
  client_id INTEGER REFERENCES clients(id) ON DELETE SET NULL,
  order_id INTEGER REFERENCES orders(id) ON DELETE SET NULL,
  order_items_id INTEGER REFERENCES order_items(id) ON DELETE SET NULL,
);

CREATE TABLE IF NOT EXISTS status (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  types VARCHAR(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS promote_code (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  limit_usage INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS slides (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  image_url TEXT NOT NULL,
  link_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO status (name, types) VALUES 
('Pending', 'order_status'),
('Completed', 'order_status'),
('Cancelled', 'order_status'),
('Pending', 'payment_status'),
('Completed', 'payment_status'),
('Cancelled', 'payment_status'),
('Dine-in', 'order_type'),
('Takeaway', 'order_type'),
('Delivery', 'order_type') ON CONFLICT DO NOTHING;

INSERT INTO codes (name, description) VALUES 
('Discount Type', 'Discount Type') ON CONFLICT DO NOTHING;
INSERT INTO codes_values (code_id, value, label, sort_order, is_active) VALUES 
(1, 'Percentage', 'Percentage', 1, true),
(1, 'Fixed Amount', 'Fixed Amount', 2, true)
ON CONFLICT DO NOTHING;


-- Seed basic roles and permissions
INSERT INTO roles (name, description ) VALUES ('Admin', 'System Administrator'), ('User', 'Standard User') ON CONFLICT DO NOTHING;

INSERT INTO permissions (name, resource, action, group_name, is_active) VALUES 
('CREATE_USER', 'USER','CREATE', 'Organization', true),
('READ_USER', 'USER','READ', 'Organization', true),
('UPDATE_USER', 'USER','UPDATE', 'Organization', true),
('DELETE_USER', 'USER','DELETE', 'Organization', true),
('CREATE_EMPLOYEE', 'EMPLOYEE','CREATE', 'Organization', true),
('READ_EMPLOYEE', 'EMPLOYEE','READ', 'Organization', true),
('UPDATE_EMPLOYEE', 'EMPLOYEE','UPDATE', 'Organization', true),
('DELETE_EMPLOYEE', 'EMPLOYEE','DELETE', 'Organization', true),
('CREATE_OFFICE', 'OFFICE','CREATE', 'Organization', true),
('READ_OFFICE', 'OFFICE','READ', 'Organization', true),
('UPDATE_OFFICE', 'OFFICE','UPDATE', 'Organization', true),
('DELETE_OFFICE', 'OFFICE','DELETE', 'Organization', true),
('VIEW_DASHBOARD', 'DASHBOARD','VIEW', 'Organization', true),
('CREATE_PRODUCT', 'PRODUCT','CREATE', 'Organization', true),
('READ_PRODUCT', 'PRODUCT','READ', 'Organization', true),
('UPDATE_PRODUCT', 'PRODUCT','UPDATE', 'Organization', true),
('DELETE_PRODUCT', 'PRODUCT','DELETE', 'Organization', true),
('CREATE_CATEGORY', 'CATEGORY','CREATE', 'Organization', true),
('READ_CATEGORY', 'CATEGORY','READ', 'Organization', true),
('UPDATE_CATEGORY', 'CATEGORY','UPDATE', 'Organization', true),
('DELETE_CATEGORY', 'CATEGORY','DELETE', 'Organization', true),
('CREATE_ORDER', 'ORDER','CREATE', 'Organization', true),
('READ_ORDER', 'ORDER','READ', 'Organization', true),
('UPDATE_ORDER', 'ORDER','UPDATE', 'Organization', true),
('DELETE_ORDER', 'ORDER','DELETE', 'Organization', true),
('CREATE_DISCOUNT', 'DISCOUNT','CREATE', 'Organization', true),
('READ_DISCOUNT', 'READ_DISCOUNT','READ', 'Organization', true),
('UPDATE_DISCOUNT', 'UPDATE_DISCOUNT','UPDATE', 'Organization', true),
('DELETE_DISCOUNT', 'DELETE_DISCOUNT','DELETE', 'Organization', true),
('CREATE_ROLE', 'ROLE','CREATE', 'Organization', true),
('READ_ROLE', 'ROLE','READ', 'Organization', true),
('UPDATE_ROLE', 'ROLE','UPDATE', 'Organization', true),
('DELETE_ROLE', 'ROLE','DELETE', 'Organization', true)
ON CONFLICT (name) DO UPDATE SET resource = EXCLUDED.resource, action = EXCLUDED.action, group_name = EXCLUDED.group_name;

-- Grant all permissions to admin (assumes roles and permissions are seeded)
INSERT INTO role_permissions (role_id, permission_id) 
SELECT r.id, p.id FROM roles r, permissions p 
WHERE r.name = 'Admin' AND p.is_active = true 
ON CONFLICT DO NOTHING;