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