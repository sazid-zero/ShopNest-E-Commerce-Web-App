-- DUMMY DATA FOR INITIAL SEED

-- 1. Create a System Admin/Shop Owner
INSERT INTO users (id, email, name, role) 
VALUES ('system-admin', 'admin@shopnest.com', 'System Admin', 'admin')
ON CONFLICT (id) DO NOTHING;

-- 2. Create Initial Categories (from lib/categories.ts)
INSERT INTO categories (name, slug, icon) VALUES
('Phones', 'phones', 'Smartphone'),
('Computers', 'computers', 'Laptop'),
('Headphones', 'headphones', 'Headphones'),
('Camera', 'camera', 'Camera'),
('Gaming', 'gaming', 'Gamepad2'),
('TV & Audio', 'tv-audio', 'Tv'),
('SmartWatch', 'smartwatch', 'Watch'),
('Printers', 'printers', 'Printer'),
('Drones', 'drones', 'Drone'),
('Smart Home', 'smart-home', 'House'),
('Accessories', 'accessories', 'ShoppingBag'),
('Wearables', 'wearables', 'MonitorSmartphone'),
('Pet Supplies', 'pet-supplies', 'Bone'),
('Beauty & Personal Care', 'beauty-personal-care', 'Sparkles'),
('Toys & Kids', 'toys-kids', 'Car'),
('Fashion', 'fashion', 'Shirt')
ON CONFLICT (name) DO NOTHING;

-- 3. Create a default Shop
INSERT INTO shops (owner_id, name, description)
VALUES ('system-admin', 'ShopNest Official', 'The official store for ShopNest products')
ON CONFLICT DO NOTHING;

-- 4. Seed Products (Mapping from lib/products.ts)
-- HAVIT HV-G92 Gamepad
INSERT INTO products (name, description, price, original_price, discount, image_url, stock, category_id, shop_id, type)
SELECT 'HAVIT HV-G92 Gamepad', 'High precision gaming gamepad.', 1200, 1600, 40, '/flash/hv-g92.webp', 100, id, (SELECT id FROM shops LIMIT 1), 'flash-sale'
FROM categories WHERE name = 'Gaming';

-- AK-900 Wired Keyboard
INSERT INTO products (name, description, price, original_price, discount, image_url, stock, category_id, shop_id, type)
SELECT 'AK-900 Wired Keyboard', 'Responsive wired keyboard for gaming and work.', 960, 1160, 35, '/flash/ak-900.jpg', 50, id, (SELECT id FROM shops LIMIT 1), 'flash-sale'
FROM categories WHERE name = 'Computers';

-- IPS LCD Gaming Monitor
INSERT INTO products (name, description, price, original_price, discount, image_url, stock, category_id, shop_id, type)
SELECT 'IPS LCD Gaming Monitor', 'High refresh rate gaming monitor.', 37000, 40000, 30, '/flash/monitor.webp', 20, id, (SELECT id FROM shops LIMIT 1), 'flash-sale'
FROM categories WHERE name = 'TV & Audio';

-- Ergonomic Gaming Mouse
INSERT INTO products (name, description, price, original_price, discount, image_url, stock, category_id, shop_id, type)
SELECT 'Ergonomic Gaming Mouse', 'Precision gaming mouse with RGB.', 750, 850, 25, '/flash/mouse.webp', 80, id, (SELECT id FROM shops LIMIT 1), 'flash-sale'
FROM categories WHERE name = 'Gaming';

-- Noise-Cancelling Headset
INSERT INTO products (name, description, price, original_price, discount, image_url, stock, category_id, shop_id, type)
SELECT 'Noise-Cancelling Headset', 'Crystal clear audio with ANC.', 1400, 2000, 30, '/flash/headset.jpg', 45, id, (SELECT id FROM shops LIMIT 1), 'flash-sale'
FROM categories WHERE name = 'Headphones';

-- Initial Banners
INSERT INTO banners (title, subtitle, image_url, link_url, is_active, position) VALUES
('iPhone 14 Series', 'Up to 10% off Voucher', '/banners/banner1.png', '/products?category=phones', TRUE, 1),
('Gaming Accessories', 'Level up your setup', '/banners/banner2.png', '/products?category=gaming', TRUE, 2);
