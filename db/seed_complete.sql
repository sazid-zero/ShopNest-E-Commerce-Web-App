-- COMPREHENSIVE SEED DATA FOR SHOPNEST E-COMMERCE
-- This file seeds all products, shops, banners, and categories from the mock data

-- 1. Create System Admin/Shop Owners
INSERT INTO users (id, email, name, role) VALUES
('system-admin', 'admin@shopnest.com', 'System Admin', 'admin'),
('seller-tech', 'seller1@shopnest.com', 'Tech Seller', 'seller'),
('seller-fashion', 'seller2@shopnest.com', 'Fashion Seller', 'seller'),
('seller-gaming', 'seller3@shopnest.com', 'Gaming Seller', 'seller')
ON CONFLICT (id) DO NOTHING;

-- 2. Create Categories (from lib/categories.ts)
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
ON CONFLICT (slug) DO NOTHING;

-- 3. Create Shops
INSERT INTO shops (owner_id, name, description, logo_url, cover_url, created_at) VALUES
('system-admin', 'ShopNest Official', 'Your trusted source for quality electronics and accessories', '/covers/shopnest.jpg', '/covers/shopnest.jpg', NOW()),
('seller-tech', 'Tech Paradise', 'Premium technology products and gadgets', '/covers/bestbuy.jpg', '/covers/bestbuy.jpg', NOW()),
('seller-gaming', 'GameZone Pro', 'The ultimate gaming gear destination', '/covers/amazon.jpg', '/covers/amazon.jpg', NOW()),
('seller-fashion', 'Style Avenue', 'Trendy fashion and lifestyle products', '/covers/staples.jpg', '/covers/staples.jpg', NOW())
ON CONFLICT (name) DO NOTHING;

-- 4. Seed ALL Products (18 total from lib/products.ts)

-- FLASH SALE Products (IDs 1-10)
INSERT INTO products (name, description, price, original_price, discount, image_url, stock, rating, reviews_count, category_id, shop_id, type)
SELECT 'HAVIT HV-G92 Gamepad', 'High precision gaming gamepad with ergonomic design.', 1200, 1600, 40, '/flash/hv-g92.webp', 100, 4.5, 88, c.id, s.id, 'flash-sale'
FROM categories c, shops s WHERE c.name = 'Gaming' AND s.name = 'GameZone Pro';

INSERT INTO products (name, description, price, original_price, discount, image_url, stock, rating, reviews_count, category_id, shop_id, type)
SELECT 'AK-900 Wired Keyboard', 'Responsive wired keyboard for gaming and productivity.', 960, 1160, 35, '/flash/ak-900.jpg', 50, 4.0, 75, c.id, s.id, 'flash-sale'
FROM categories c, shops s WHERE c.name = 'Computers' AND s.name = 'Tech Paradise';

INSERT INTO products (name, description, price, original_price, discount, image_url, stock, rating, reviews_count, category_id, shop_id, type)
SELECT 'IPS LCD Gaming Monitor', 'High refresh rate gaming monitor with stunning visuals.', 37000, 40000, 30, '/flash/monitor.webp', 20, 4.8, 99, c.id, s.id, 'flash-sale'
FROM categories c, shops s WHERE c.name = 'TV & Audio' AND s.name = 'Tech Paradise';

INSERT INTO products (name, description, price, original_price, discount, image_url, stock, rating, reviews_count, category_id, shop_id, type)
SELECT 'Ergonomic Gaming Mouse', 'Precision gaming mouse with customizable RGB lighting.', 750, 850, 25, '/flash/mouse.webp', 80, 4.3, 54, c.id, s.id, 'flash-sale'
FROM categories c, shops s WHERE c.name = 'Gaming' AND s.name = 'GameZone Pro';

INSERT INTO products (name, description, price, original_price, discount, image_url, stock, rating, reviews_count, category_id, shop_id, type)
SELECT 'Noise-Cancelling Headset', 'Crystal clear audio with active noise cancellation.', 1400, 2000, 30, '/flash/headset.jpg', 45, 4.6, 62, c.id, s.id, 'flash-sale'
FROM categories c, shops s WHERE c.name = 'Headphones' AND s.name = 'ShopNest Official';

INSERT INTO products (name, description, price, original_price, discount, image_url, stock, rating, reviews_count, category_id, shop_id, type)
SELECT 'S-Series Comfort Chair', 'Ergonomic gaming chair with lumbar support.', 3750, 3900, 25, '/flash/chair.webp', 30, 4.7, 82, c.id, s.id, 'flash-sale'
FROM categories c, shops s WHERE c.name = 'Accessories' AND s.name = 'ShopNest Official';

INSERT INTO products (name, description, price, original_price, discount, image_url, stock, rating, reviews_count, category_id, shop_id, type)
SELECT 'HP 14s-dq3139TU Intel Celeron N4500 14" FHD Laptop', 'Reliable laptop for everyday computing tasks.', 39500, 42000, 15, '/flash/laptop.webp', 15, 4.4, 68, c.id, s.id, 'flash-sale'
FROM categories c, shops s WHERE c.name = 'Computers' AND s.name = 'Tech Paradise';

INSERT INTO products (name, description, price, original_price, discount, image_url, stock, rating, reviews_count, category_id, shop_id, type)
SELECT 'HONOR Pad X8a 4GB RAM 128GB Storage 11" Tablet', 'Powerful tablet for entertainment and productivity.', 19900, 21000, 30, '/flash/tablet.webp', 25, 4.0, 37, c.id, s.id, 'flash-sale'
FROM categories c, shops s WHERE c.name = 'Wearables' AND s.name = 'Tech Paradise';

INSERT INTO products (name, description, price, original_price, discount, image_url, stock, rating, reviews_count, category_id, shop_id, type)
SELECT 'USB 3.0 4-in-1 Hub', 'Expand your connectivity with 4 high-speed USB ports.', 700, 800, 33, '/flash/usbhub.webp', 120, 4.1, 29, c.id, s.id, 'flash-sale'
FROM categories c, shops s WHERE c.name = 'Accessories' AND s.name = 'ShopNest Official';

INSERT INTO products (name, description, price, original_price, discount, image_url, stock, rating, reviews_count, category_id, shop_id, type)
SELECT 'Hoco J89 10000mAh 20W Fast Charging Digital Display Power Bank', 'Keep your devices charged on the go with fast charging.', 1090, 1310, 30, '/flash/powerbank.webp', 90, 4.3, 41, c.id, s.id, 'flash-sale'
FROM categories c, shops s WHERE c.name = 'Accessories' AND s.name = 'ShopNest Official';

-- BEST SELLER Products (IDs 11-18)
INSERT INTO products (name, description, price, original_price, discount, image_url, stock, rating, reviews_count, category_id, shop_id, type)
SELECT 'Breed Dry Dog Food', 'Nutritious dry food for your canine companion.', 1200, 1600, 25, '/best/dogfood.jpg', 60, 4.5, 88, c.id, s.id, 'best-seller'
FROM categories c, shops s WHERE c.name = 'Smart Home' AND s.name = 'ShopNest Official';

INSERT INTO products (name, description, price, original_price, discount, image_url, stock, rating, reviews_count, category_id, shop_id, type)
SELECT 'CANON EOS 200D Mark-II', 'Professional DSLR camera for stunning photography.', 37000, 40000, 10, '/best/camera.jpg', 12, 4.8, 99, c.id, s.id, 'best-seller'
FROM categories c, shops s WHERE c.name = 'Camera' AND s.name = 'Tech Paradise';

INSERT INTO products (name, description, price, original_price, discount, image_url, stock, rating, reviews_count, category_id, shop_id, type)
SELECT 'ASUS FHD Gaming Laptop', 'High-performance laptop for gaming and content creation.', 39500, 42000, 15, '/best/laptop.jpg', 18, 4.4, 68, c.id, s.id, 'best-seller'
FROM categories c, shops s WHERE c.name = 'Computers' AND s.name = 'Tech Paradise';

INSERT INTO products (name, description, price, original_price, discount, image_url, stock, rating, reviews_count, category_id, shop_id, type)
SELECT 'Curology Product Set', 'Complete skincare solution for healthy, glowing skin.', 1990, 2100, 5, '/best/curology2.png', 40, 4.0, 37, c.id, s.id, 'best-seller'
FROM categories c, shops s WHERE c.name = 'Smart Home' AND s.name = 'Style Avenue';

INSERT INTO products (name, description, price, original_price, discount, image_url, stock, rating, reviews_count, category_id, shop_id, type)
SELECT 'Kids Electric Car', 'Fun and safe electric car for children.', 10900, 13100, 17, '/best/kidscar.jpg', 8, 4.3, 41, c.id, s.id, 'best-seller'
FROM categories c, shops s WHERE c.name = 'Accessories' AND s.name = 'ShopNest Official';

INSERT INTO products (name, description, price, original_price, discount, image_url, stock, rating, reviews_count, category_id, shop_id, type)
SELECT 'Jr. Zoom Soccer Cleats', 'Professional soccer cleats for young athletes.', 750, 850, 12, '/best/cleats.jpg', 55, 4.3, 54, c.id, s.id, 'best-seller'
FROM categories c, shops s WHERE c.name = 'Wearables' AND s.name = 'Style Avenue';

INSERT INTO products (name, description, price, original_price, discount, image_url, stock, rating, reviews_count, category_id, shop_id, type)
SELECT 'GP1 Shooter USB Gamepad', 'USB gamepad with precise controls for PC gaming.', 1400, 2000, 30, '/best/gamepad.jpg', 70, 4.6, 62, c.id, s.id, 'best-seller'
FROM categories c, shops s WHERE c.name = 'Gaming' AND s.name = 'GameZone Pro';

INSERT INTO products (name, description, price, original_price, discount, image_url, stock, rating, reviews_count, category_id, shop_id, type)
SELECT 'Quilted Satin Jacket', 'Stylish and comfortable quilted jacket.', 3750, 3900, 5, '/best/satin.jpg', 35, 4.7, 82, c.id, s.id, 'best-seller'
FROM categories c, shops s WHERE c.name = 'Wearables' AND s.name = 'Style Avenue';

-- 5. Create Banners
INSERT INTO banners (title, subtitle, image_url, link_url, is_active, position) VALUES
('iPhone 14 Series', 'Up to 10% off Voucher', '/banners/banner1.png', '/products?category=phones', TRUE, 1),
('Gaming Accessories', 'Level up your setup', '/banners/banner2.png', '/products?category=gaming', TRUE, 2),
('Smart Home Sale', 'Transform your living space', '/banners/banner3.png', '/products?category=smart-home', TRUE, 3),
('Tech Paradise Deals', 'Premium gadgets at unbeatable prices', '/banners/banner4.png', '/products?type=best-seller', TRUE, 4)
ON CONFLICT DO NOTHING;
