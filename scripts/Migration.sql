CREATE SEQUENCE IF NOT EXISTS categories_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
-- DROP SEQUENCE clients_id_seq;
CREATE SEQUENCE IF NOT EXISTS clients_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
-- DROP SEQUENCE codes_id_seq;
CREATE SEQUENCE IF NOT EXISTS codes_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
-- DROP SEQUENCE codes_values_id_seq;
CREATE SEQUENCE IF NOT EXISTS codes_values_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
-- DROP SEQUENCE configurations_id_seq;
CREATE SEQUENCE IF NOT EXISTS configurations_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
-- DROP SEQUENCE departments_id_seq;
CREATE SEQUENCE IF NOT EXISTS departments_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
-- DROP SEQUENCE discounts_id_seq;
CREATE SEQUENCE IF NOT EXISTS discounts_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
-- DROP SEQUENCE employees_id_seq;
CREATE SEQUENCE IF NOT EXISTS employees_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
-- DROP SEQUENCE offices_id_seq;
CREATE SEQUENCE IF NOT EXISTS offices_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
-- DROP SEQUENCE order_items_id_seq;
CREATE SEQUENCE IF NOT EXISTS order_items_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
-- DROP SEQUENCE orders_history_id_seq;
CREATE SEQUENCE IF NOT EXISTS orders_history_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
-- DROP SEQUENCE orders_id_seq;
CREATE SEQUENCE IF NOT EXISTS orders_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
-- DROP SEQUENCE permissions_id_seq;
CREATE SEQUENCE IF NOT EXISTS permissions_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
-- DROP SEQUENCE positions_id_seq;
CREATE SEQUENCE IF NOT EXISTS positions_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
-- DROP SEQUENCE products_id_seq;
CREATE SEQUENCE IF NOT EXISTS products_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
-- DROP SEQUENCE promote_code_id_seq;
CREATE SEQUENCE IF NOT EXISTS promote_code_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
-- DROP SEQUENCE roles_id_seq;
CREATE SEQUENCE IF NOT EXISTS roles_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
-- DROP SEQUENCE slides_id_seq;
CREATE SEQUENCE IF NOT EXISTS slides_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
-- DROP SEQUENCE status_id_seq;
CREATE SEQUENCE IF NOT EXISTS status_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
-- DROP SEQUENCE users_id_seq;
CREATE SEQUENCE IF NOT EXISTS users_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
-- public.clients definition
-- Drop table
-- DROP TABLE clients;
CREATE TABLE IF NOT EXISTS clients (
  id serial4 NOT NULL,
  firstname varchar(100) NOT NULL,
  lastname varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  recovery_email varchar(100) NULL,
  phone varchar(13) NOT NULL,
  "password" varchar(255) NOT NULL,
  last_password_reset timestamp NULL,
  signup_on_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
  otp varchar(100) NULL,
  otp_expire timestamp NULL,
  CONSTRAINT clients_email_key UNIQUE (email),
  CONSTRAINT clients_pkey PRIMARY KEY (id),
  CONSTRAINT clients_recovery_email_key UNIQUE (recovery_email)
);
-- public.codes definition
-- Drop table
-- DROP TABLE codes;
CREATE TABLE IF NOT EXISTS codes (
  id serial4 NOT NULL,
  "name" varchar(255) NOT NULL,
  description text NULL,
  is_active bool DEFAULT true NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
  CONSTRAINT codes_name_key UNIQUE (name),
  CONSTRAINT codes_pkey PRIMARY KEY (id)
);
-- public.configurations definition
-- Drop table
-- DROP TABLE configurations;
CREATE TABLE IF NOT EXISTS configurations (
  id serial4 NOT NULL,
  "name" varchar(255) NOT NULL,
  value text NULL,
  description text NULL,
  is_active bool DEFAULT true NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
  CONSTRAINT configurations_pkey PRIMARY KEY (id)
);
-- public.departments definition
-- Drop table
-- DROP TABLE departments;
CREATE TABLE IF NOT EXISTS departments (
  id serial4 NOT NULL,
  "name" varchar(50) NOT NULL,
  description text NULL,
  is_active bool DEFAULT true NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
  CONSTRAINT departments_name_key UNIQUE (name),
  CONSTRAINT departments_pkey PRIMARY KEY (id)
);
-- public.offices definition
-- Drop table
-- DROP TABLE offices;
CREATE TABLE IF NOT EXISTS offices (
  id serial4 NOT NULL,
  "name" varchar(255) NOT NULL,
  address text NULL,
  phone varchar(20) NULL,
  email varchar(100) NULL,
  is_active bool DEFAULT true NULL,
  is_deleted bool DEFAULT false NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
  deleted_at timestamp NULL,
  CONSTRAINT offices_pkey PRIMARY KEY (id)
);
-- public.permissions definition
-- Drop table
-- DROP TABLE permissions;
CREATE TABLE IF NOT EXISTS permissions (
  id serial4 NOT NULL,
  "name" varchar(100) NOT NULL,
  resource varchar(100) NOT NULL,
  "action" varchar(100) NOT NULL,
  is_active bool DEFAULT true NULL,
  group_name varchar(100) NULL,
  CONSTRAINT permissions_name_key UNIQUE (name),
  CONSTRAINT permissions_pkey PRIMARY KEY (id)
);
-- public.positions definition
-- Drop table
-- DROP TABLE positions;
CREATE TABLE IF NOT EXISTS positions (
  id serial4 NOT NULL,
  "name" varchar(50) NOT NULL,
  description text NULL,
  is_active bool DEFAULT true NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
  CONSTRAINT positions_name_key UNIQUE (name),
  CONSTRAINT positions_pkey PRIMARY KEY (id)
);
-- public.promote_code definition
-- Drop table
-- DROP TABLE promote_code;
CREATE TABLE IF NOT EXISTS promote_code (
  id serial4 NOT NULL,
  code varchar(50) NOT NULL,
  description text NULL,
  start_date timestamp NULL,
  end_date timestamp NULL,
  limit_usage int4 NULL,
  is_active bool DEFAULT true NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
  CONSTRAINT promote_code_code_key UNIQUE (code),
  CONSTRAINT promote_code_pkey PRIMARY KEY (id)
);
-- public.roles definition
-- Drop table
-- DROP TABLE roles;
CREATE TABLE IF NOT EXISTS roles (
  id serial4 NOT NULL,
  "name" varchar(50) NOT NULL,
  description text NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
  is_active bool DEFAULT true NULL,
  CONSTRAINT roles_name_key UNIQUE (name),
  CONSTRAINT roles_pkey PRIMARY KEY (id)
);
-- public.slides definition
-- Drop table
-- DROP TABLE slides;
CREATE TABLE IF NOT EXISTS slides (
  id serial4 NOT NULL,
  title varchar(255) NULL,
  description text NULL,
  image_url text NOT NULL,
  link_url text NULL,
  sort_order int4 DEFAULT 0 NULL,
  is_active bool DEFAULT true NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
  CONSTRAINT slides_pkey PRIMARY KEY (id)
);
-- public.status definition
-- Drop table
-- DROP TABLE status;
CREATE TABLE IF NOT EXISTS status (
  id serial4 NOT NULL,
  "name" varchar(255) NOT NULL,
  "types" varchar(255) NOT NULL,
  CONSTRAINT status_pkey PRIMARY KEY (id)
);
-- public.categories definition
-- Drop table
-- DROP TABLE categories;
CREATE TABLE IF NOT EXISTS categories (
  id serial4 NOT NULL,
  "name" varchar(100) NOT NULL,
  description text NULL,
  status_id int4 NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
  CONSTRAINT categories_name_key UNIQUE (name),
  CONSTRAINT categories_pkey PRIMARY KEY (id),
  CONSTRAINT categories_status_id_fkey FOREIGN KEY (status_id) REFERENCES status(id) ON DELETE
  SET NULL
);
-- public.codes_values definition
-- Drop table
-- DROP TABLE codes_values;
CREATE TABLE IF NOT EXISTS codes_values (
  id serial4 NOT NULL,
  code_id int4 NULL,
  value varchar(255) NOT NULL,
  "label" varchar(255) NULL,
  sort_order int4 DEFAULT 0 NULL,
  is_active bool DEFAULT true NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
  CONSTRAINT codes_values_pkey PRIMARY KEY (id),
  CONSTRAINT codes_values_code_id_fkey FOREIGN KEY (code_id) REFERENCES codes(id) ON DELETE CASCADE
);
-- public.discounts definition
-- Drop table
-- DROP TABLE discounts;
CREATE TABLE IF NOT EXISTS discounts (
  id serial4 NOT NULL,
  discount_type_id int4 NULL,
  total_value numeric(10, 2) NOT NULL,
  start_date date NULL,
  end_date date NULL,
  status_id int4 NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
  CONSTRAINT discounts_pkey PRIMARY KEY (id),
  CONSTRAINT discounts_discount_type_id_fkey FOREIGN KEY (discount_type_id) REFERENCES codes_values(id) ON DELETE
  SET NULL,
    CONSTRAINT discounts_status_id_fkey FOREIGN KEY (status_id) REFERENCES status(id) ON DELETE
  SET NULL
);
-- public.employees definition
-- Drop table
-- DROP TABLE employees;
CREATE TABLE IF NOT EXISTS employees (
  id serial4 NOT NULL,
  office_id int4 NULL,
  first_name varchar(100) NOT NULL,
  last_name varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  phone varchar(20) NULL,
  position_id int4 NULL,
  department_id int4 NULL,
  salary numeric(10, 2) NULL,
  joinon_date date NULL,
  is_active bool DEFAULT true NULL,
  is_deleted bool DEFAULT false NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
  deleted_at timestamp NULL,
  CONSTRAINT employees_pkey PRIMARY KEY (id),
  CONSTRAINT employees_department_id_fkey FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE
  SET NULL,
    CONSTRAINT employees_office_id_fkey FOREIGN KEY (office_id) REFERENCES offices(id) ON DELETE
  SET NULL,
    CONSTRAINT employees_position_id_fkey FOREIGN KEY (position_id) REFERENCES positions(id) ON DELETE
  SET NULL
);
-- public.orders definition
-- Drop table
-- DROP TABLE orders;
CREATE TABLE IF NOT EXISTS orders (
  id serial4 NOT NULL,
  client_id int4 NULL,
  total_amount numeric(10, 2) NOT NULL,
  discount_amount numeric(10, 2) DEFAULT 0 NULL,
  final_amount numeric(10, 2) NOT NULL,
  discount_id int4 NULL,
  order_status_id int4 NULL,
  payment_status_id int4 NULL,
  order_type_id int4 NULL,
  table_number varchar(10) NULL,
  note text NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
  CONSTRAINT orders_pkey PRIMARY KEY (id),
  CONSTRAINT orders_client_id_fkey FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE
  SET NULL,
    CONSTRAINT orders_discount_id_fkey FOREIGN KEY (discount_id) REFERENCES discounts(id) ON DELETE
  SET NULL,
    CONSTRAINT orders_order_status_id_fkey FOREIGN KEY (order_status_id) REFERENCES status(id) ON DELETE
  SET NULL,
    CONSTRAINT orders_order_type_id_fkey FOREIGN KEY (order_type_id) REFERENCES status(id) ON DELETE
  SET NULL,
    CONSTRAINT orders_payment_status_id_fkey FOREIGN KEY (payment_status_id) REFERENCES status(id) ON DELETE
  SET NULL
);
-- public.products definition
-- Drop table
-- DROP TABLE products;
CREATE TABLE IF NOT EXISTS products (
  id serial4 NOT NULL,
  category_id int4 NULL,
  title varchar(255) NOT NULL,
  description text NULL,
  price numeric(10, 2) NOT NULL,
  discount_id int4 NULL,
  image_url text NULL,
  selling_count int4 DEFAULT 0 NOT NULL,
  status_id int4 NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
  CONSTRAINT products_pkey PRIMARY KEY (id),
  CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE
  SET NULL,
    CONSTRAINT products_discount_id_fkey FOREIGN KEY (discount_id) REFERENCES discounts(id) ON DELETE
  SET NULL,
    CONSTRAINT products_status_id_fkey FOREIGN KEY (status_id) REFERENCES status(id) ON DELETE
  SET NULL
);
-- public.role_permissions definition
-- Drop table
-- DROP TABLE role_permissions;
CREATE TABLE IF NOT EXISTS role_permissions (
  role_id int4 NOT NULL,
  permission_id int4 NOT NULL,
  CONSTRAINT role_permissions_pkey PRIMARY KEY (role_id, permission_id),
  CONSTRAINT role_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
  CONSTRAINT role_permissions_role_id_fkey FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);
-- public.users definition
-- Drop table
-- DROP TABLE users;
CREATE TABLE IF NOT EXISTS users (
  id serial4 NOT NULL,
  username varchar(50) NOT NULL,
  email varchar(100) NOT NULL,
  recovery_email varchar(100) NULL,
  "password" varchar(255) NOT NULL,
  password_decrypted varchar(255) NOT NULL,
  role_id int4 NULL,
  is_active bool DEFAULT true NULL,
  is_locked bool DEFAULT false NULL,
  is_deleted bool DEFAULT false NULL,
  failed_login int4 DEFAULT 0 NULL,
  last_login timestamp NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
  deleted_at timestamp NULL,
  employee_id int4 NULL,
  otp varchar(255) NULL,
  otp_expire timestamp NULL,
  CONSTRAINT users_email_key UNIQUE (email),
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_username_key UNIQUE (username),
  CONSTRAINT users_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE
  SET NULL,
    CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE
  SET NULL
);
-- public.order_items definition
-- Drop table
-- DROP TABLE order_items;
CREATE TABLE IF NOT EXISTS order_items (
  id serial4 NOT NULL,
  order_id int4 NULL,
  product_id int4 NULL,
  quantity int4 NOT NULL,
  unit_price numeric(10, 2) NOT NULL,
  subtotal numeric(10, 2) NOT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
  CONSTRAINT order_items_pkey PRIMARY KEY (id),
  CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE
  SET NULL
);
-- public.orders_history definition
-- Drop table
-- DROP TABLE orders_history;
CREATE TABLE IF NOT EXISTS orders_history (
  id serial4 NOT NULL,
  client_id int4 NULL,
  order_id int4 NULL,
  order_items_id int4 NULL,
  CONSTRAINT orders_history_pkey PRIMARY KEY (id),
  CONSTRAINT orders_history_client_id_fkey FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE
  SET NULL,
    CONSTRAINT orders_history_order_id_fkey FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE
  SET NULL,
    CONSTRAINT orders_history_order_items_id_fkey FOREIGN KEY (order_items_id) REFERENCES order_items(id) ON DELETE
  SET NULL
);