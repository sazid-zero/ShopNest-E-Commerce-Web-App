import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  const client = await pool.connect();
  
  try {
    console.log('🌱 Starting robust database seeding...');
    
    // 1. Ensure schema constraints (programmatically)
    try {
      await client.query('ALTER TABLE shops ADD CONSTRAINT shops_name_unique UNIQUE (name)');
    } catch (e) { /* already exists or other error */ }
    
    try {
      await client.query('ALTER TABLE products ADD CONSTRAINT products_name_unique UNIQUE (name)');
    } catch (e) { /* already exists or other error */ }

    // Ensure columns exist (programmatic migrations)
    try {
      await client.query('ALTER TABLE shops ADD COLUMN IF NOT EXISTS cover_url TEXT');
    } catch (e) { console.error('Error adding cover_url:', e); }

    try {
      await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS rating DECIMAL(3, 2) DEFAULT 0');
      await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS reviews_count INTEGER DEFAULT 0');
    } catch (e) { console.error('Error adding product columns:', e); }

    // 2. Create Users
    await client.query(`
      INSERT INTO users (id, email, name, role) VALUES
      ('system-admin', 'admin@shopnest.com', 'System Admin', 'admin'),
      ('seller-tech', 'seller1@shopnest.com', 'Tech Seller', 'seller'),
      ('seller-fashion', 'seller2@shopnest.com', 'Fashion Seller', 'seller'),
      ('seller-gaming', 'seller3@shopnest.com', 'Gaming Seller', 'seller')
      ON CONFLICT (id) DO NOTHING;
    `);

    // 3. Ensure Shops Exist (Manual Check)
    const shopData = [
      { owner_id: 'system-admin', name: 'ShopNest Official', description: 'Your trusted source for quality electronics and accessories', logo_url: '/logos/StyleNest.png', cover_url: '/covers/StyleNest.jpg' },
      { owner_id: 'seller-tech', name: 'Tech Paradise', description: 'Premium technology products and gadgets', logo_url: '/logos/TechHive.png', cover_url: '/covers/TechHive.jpg' },
      { owner_id: 'seller-gaming', name: 'GameZone Pro', description: 'The ultimate gaming gear destination', logo_url: '/logos/Staples.png', cover_url: '/covers/staples.jpg' },
      { owner_id: 'seller-fashion', name: 'Style Avenue', description: 'Trendy fashion and lifestyle products', logo_url: '/logos/UrbanMart.png', cover_url: '/covers/UrbanMart.jpg' }
    ];

    for (const shop of shopData) {
      const exists = await client.query('SELECT id FROM shops WHERE name = $1', [shop.name]);
      if (exists.rows.length === 0) {
        await client.query(
          'INSERT INTO shops (owner_id, name, description, logo_url, cover_url) VALUES ($1, $2, $3, $4, $5)',
          [shop.owner_id, shop.name, shop.description, shop.logo_url, shop.cover_url]
        );
      } else {
        // Update existing shop images if needed
        await client.query(
          'UPDATE shops SET logo_url = $1, cover_url = $2 WHERE name = $3',
          [shop.logo_url, shop.cover_url, shop.name]
        );
      }
    }

    // Re-fetch mapping
    const shops = await client.query("SELECT id, name FROM shops");
    const shopMap = shops.rows.reduce((acc: any, shop: any) => {
      acc[shop.name] = shop.id;
      return acc;
    }, {});

    const categories = await client.query("SELECT id, name FROM categories");
    const categoryMap = categories.rows.reduce((acc: any, cat: any) => {
      acc[cat.name] = cat.id;
      return acc;
    }, {});

    // 4. Insert all products (Manual Check)
    const products = [
      { name: 'HAVIT HV-G92 Gamepad', description: 'High precision gaming gamepad with ergonomic design.', price: 1200, original_price: 1600, discount: 40, image_url: '/flash/hv-g92.webp', stock: 100, rating: 4.5, reviews_count: 88, category: 'Gaming', shop: 'GameZone Pro', type: 'flash-sale' },
      { name: 'AK-900 Wired Keyboard', description: 'Responsive wired keyboard for gaming and productivity.', price: 960, original_price: 1160, discount: 35, image_url: '/flash/ak-900.jpg', stock: 50, rating: 4.0, reviews_count: 75, category: 'Computers', shop: 'Tech Paradise', type: 'flash-sale' },
      { name: 'IPS LCD Gaming Monitor', description: 'High refresh rate gaming monitor with stunning visuals.', price: 37000, original_price: 40000, discount: 30, image_url: '/flash/monitor.webp', stock: 20, rating: 4.8, reviews_count: 99, category: 'TV & Audio', shop: 'Tech Paradise', type: 'flash-sale' },
      { name: 'Ergonomic Gaming Mouse', description: 'Precision gaming mouse with customizable RGB lighting.', price: 750, original_price: 850, discount: 25, image_url: '/flash/mouse.webp', stock: 80, rating: 4.3, reviews_count: 54, category: 'Gaming', shop: 'GameZone Pro', type: 'flash-sale' },
      { name: 'Noise-Cancelling Headset', description: 'Crystal clear audio with active noise cancellation.', price: 1400, original_price: 2000, discount: 30, image_url: '/flash/headset.jpg', stock: 45, rating: 4.6, reviews_count: 62, category: 'Headphones', shop: 'ShopNest Official', type: 'flash-sale' },
      { name: 'S-Series Comfort Chair', description: 'Ergonomic gaming chair with lumbar support.', price: 3750, original_price: 3900, discount: 25, image_url: '/flash/chair.webp', stock: 30, rating: 4.7, reviews_count: 82, category: 'Accessories', shop: 'ShopNest Official', type: 'flash-sale' },
      { name: 'HP 14s-dq3139TU Intel Celeron N4500 14" FHD Laptop', description: 'Reliable laptop for everyday computing tasks.', price: 39500, original_price: 42000, discount: 15, image_url: '/flash/laptop.webp', stock: 15, rating: 4.4, reviews_count: 68, category: 'Computers', shop: 'Tech Paradise', type: 'flash-sale' },
      { name: 'HONOR Pad X8a 4GB RAM 128GB Storage 11" Tablet', description: 'Powerful tablet for entertainment and productivity.', price: 19900, original_price: 21000, discount: 30, image_url: '/flash/tablet.webp', stock: 25, rating: 4.0, reviews_count: 37, category: 'Wearables', shop: 'Tech Paradise', type: 'flash-sale' },
      { name: 'USB 3.0 4-in-1 Hub', description: 'Expand your connectivity with 4 high-speed USB ports.', price: 700, original_price: 800, discount: 33, image_url: '/flash/usbhub.webp', stock: 120, rating: 4.1, reviews_count: 29, category: 'Accessories', shop: 'ShopNest Official', type: 'flash-sale' },
      { name: 'Hoco J89 10000mAh 20W Fast Charging Digital Display Power Bank', description: 'Keep your devices charged on the go with fast charging.', price: 1090, original_price: 1310, discount: 30, image_url: '/flash/powerbank.webp', stock: 90, rating: 4.3, reviews_count: 41, category: 'Accessories', shop: 'ShopNest Official', type: 'flash-sale' },
      { name: 'Breed Dry Dog Food', description: 'Nutritious dry food for your canine companion.', price: 1200, original_price: 1600, discount: 25, image_url: '/best/dogfood.jpg', stock: 60, rating: 4.5, reviews_count: 88, category: 'Smart Home', shop: 'ShopNest Official', type: 'best-seller' },
      { name: 'CANON EOS 200D Mark-II', description: 'Professional DSLR camera for stunning photography.', price: 37000, original_price: 40000, discount: 10, image_url: '/best/camera.jpg', stock: 12, rating: 4.8, reviews_count: 99, category: 'Camera', shop: 'Tech Paradise', type: 'best-seller' },
      { name: 'ASUS FHD Gaming Laptop', description: 'High-performance laptop for gaming and content creation.', price: 39500, original_price: 42000, discount: 15, image_url: '/best/laptop.jpg', stock: 18, rating: 4.4, reviews_count: 68, category: 'Computers', shop: 'Tech Paradise', type: 'best-seller' },
      { name: 'Curology Product Set', description: 'Complete skincare solution for healthy, glowing skin.', price: 1990, original_price: 2100, discount: 5, image_url: '/best/curology2.png', stock: 40, rating: 4.0, reviews_count: 37, category: 'Smart Home', shop: 'Style Avenue', type: 'best-seller' },
      { name: 'Kids Electric Car', description: 'Fun and safe electric car for children.', price: 10900, original_price: 13100, discount: 17, image_url: '/best/kidscar.jpg', stock: 8, rating: 4.3, reviews_count: 41, category: 'Accessories', shop: 'ShopNest Official', type: 'best-seller' },
      { name: 'Jr. Zoom Soccer Cleats', description: 'Professional soccer cleats for young athletes.', price: 750, original_price: 850, discount: 12, image_url: '/best/cleats.jpg', stock: 55, rating: 4.3, reviews_count: 54, category: 'Wearables', shop: 'Style Avenue', type: 'best-seller' },
      { name: 'GP1 Shooter USB Gamepad', description: 'USB gamepad with precise controls for PC gaming.', price: 1400, original_price: 2000, discount: 30, image_url: '/best/gamepad.jpg', stock: 70, rating: 4.6, reviews_count: 62, category: 'Gaming', shop: 'GameZone Pro', type: 'best-seller' },
      { name: 'Quilted Satin Jacket', description: 'Stylish and comfortable quilted jacket.', price: 3750, original_price: 3900, discount: 5, image_url: '/best/satin.jpg', stock: 35, rating: 4.7, reviews_count: 82, category: 'Wearables', shop: 'Style Avenue', type: 'best-seller' },
    ];

    for (const product of products) {
      const categoryId = categoryMap[product.category];
      const shopId = shopMap[product.shop];
      
      if (!categoryId || !shopId) continue;

      const exists = await client.query('SELECT id FROM products WHERE name = $1', [product.name]);
      if (exists.rows.length > 0) {
        await client.query(
          `UPDATE products SET stock = $1, price = $2, original_price = $3, discount = $4, 
            description = $5, image_url = $6, rating = $7, reviews_count = $8,
            category_id = $9, shop_id = $10, type = $11 WHERE name = $12`,
          [product.stock, product.price, product.original_price, product.discount,
           product.description, product.image_url, product.rating, product.reviews_count,
           categoryId, shopId, product.type, product.name]
        );
      } else {
        await client.query(
          `INSERT INTO products (name, description, price, original_price, discount, image_url, stock, rating, reviews_count, category_id, shop_id, type)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
          [product.name, product.description, product.price, product.original_price, product.discount, 
           product.image_url, product.stock, product.rating, product.reviews_count, categoryId, shopId, product.type]
        );
      }
    }

    // 5. Insert banners (Manual Check)
    // First, cleanup banners with old broken paths
    await client.query("DELETE FROM banners WHERE image_url LIKE '%/banners/%'");

    const bannerData = [
      { title: 'iPhone 16 Series', subtitle: 'Experience the future', image_url: '/Apple-16-series.webp', link_url: '/products', position: 1 },
      { title: 'iPad Pro M4', subtitle: 'The most powerful iPad ever', image_url: '/iPad-Pro-M4.webp', link_url: '/products', position: 2 },
      { title: 'Samsung S25 Ultra', subtitle: 'Unmatched performance', image_url: '/Samsung-S25-Ultra.webp', link_url: '/products', position: 3 },
      { title: 'Macbook Air M4', subtitle: 'Thin, light, and powerful', image_url: '/Macbook-Air-M4.webp', link_url: '/products', position: 4 }
    ];

    for (const banner of bannerData) {
      const exists = await client.query('SELECT id FROM banners WHERE title = $1', [banner.title]);
      if (exists.rows.length === 0) {
        await client.query(
          'INSERT INTO banners (title, subtitle, image_url, link_url, is_active, position) VALUES ($1, $2, $3, $4, TRUE, $5)',
          [banner.title, banner.subtitle, banner.image_url, banner.link_url, banner.position]
        );
      } else {
        // Update existing banner images if needed
        await client.query(
          'UPDATE banners SET image_url = $1, subtitle = $2 WHERE title = $3',
          [banner.image_url, banner.subtitle, banner.title]
        );
      }
    }


    const productsCount = await client.query('SELECT COUNT(*) FROM products');
    const shopsCount = await client.query('SELECT COUNT(*) FROM shops');
    const bannersCount = await client.query('SELECT COUNT(*) FROM banners');
    
    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      summary: {
        products: productsCount.rows[0].count,
        shops: shopsCount.rows[0].count,
        banners: bannersCount.rows[0].count
      }
    });
    
  } catch (error: any) {
    console.error('❌ Error seeding database:', error);
    return NextResponse.json({ 
      error: error.message,
      detail: error.detail
    }, { status: 500 });
  } finally {
    client.release();
  }
}

