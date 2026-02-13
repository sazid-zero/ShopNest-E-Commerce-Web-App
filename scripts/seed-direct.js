// Direct database seed script
import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function seed() {
  const client = await pool.connect();
  
  try {
    console.log('🌱 Starting database seeding...\n');

    // 1. Create Users
    await client.query(`
      INSERT INTO users (id, email, name, role) VALUES
      ('system-admin', 'admin@shopnest.com', 'System Admin', 'admin'),
      ('seller-tech', 'seller1@shopnest.com', 'Tech Seller', 'seller'),
      ('seller-fashion', 'seller2@shopnest.com', 'Fashion Seller', 'seller'),
      ('seller-gaming', 'seller3@shopnest.com', 'Gaming Seller', 'seller')
      ON CONFLICT (id) DO NOTHING;
    `);
    console.log('✓ Users created');

    // 2. Create Shops
    const shopsResult = await client.query('SELECT COUNT(*) FROM shops');
    if (parseInt(shopsResult.rows[0].count) < 4) {
      await client.query(`
        INSERT INTO shops (owner_id, name, description, logo_url, cover_url) VALUES
        ('system-admin', 'ShopNest Official', 'Your trusted source for quality electronics and accessories', '/covers/shopnest.jpg', '/covers/shopnest.jpg'),
        ('seller-tech', 'Tech Paradise', 'Premium technology products and gadgets', '/covers/bestbuy.jpg', '/covers/bestbuy.jpg'),
        ('seller-gaming', 'GameZone Pro', 'The ultimate gaming gear destination', '/covers/amazon.jpg', '/covers/amazon.jpg'),
        ('seller-fashion', 'Style Avenue', 'Trendy fashion and lifestyle products', '/covers/staples.jpg', '/covers/staples.jpg')
        ON CONFLICT (name) DO NOTHING;
      `);
    }
    console.log('✓ Shops created');

    // 3. Get mappings
    const shops = await client.query('SELECT id, name FROM shops');
    const shopMap = {};
    shops.rows.forEach(shop => {
      shopMap[shop.name] = shop.id;
    });

    const categories = await client.query('SELECT id, name FROM categories');
    const categoryMap = {};
    categories.rows.forEach(cat => {
      categoryMap[cat.name] = cat.id;
    });

    console.log('✓ Fetched mappings');

    // 4. Insert products
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

    let inserted = 0, updated = 0, skipped = 0;

    for (const product of products) {
      const categoryId = categoryMap[product.category];
      const shopId = shopMap[product.shop];
      
      if (!categoryId || !shopId) {
        console.log(`  ⚠ Skipping "${product.name}" - missing category or shop`);
        skipped++;
        continue;
      }

      const existing = await client.query('SELECT id FROM products WHERE name = $1', [product.name]);

      if (existing.rows.length > 0) {
        await client.query(
          `UPDATE products SET stock = $1, price = $2, original_price = $3, discount = $4, 
            description = $5, image_url = $6, rating = $7, reviews_count = $8,
            category_id = $9, shop_id = $10, type = $11 WHERE name = $12`,
          [product.stock, product.price, product.original_price, product.discount,
           product.description, product.image_url, product.rating, product.reviews_count,
           categoryId, shopId, product.type, product.name]
        );
        updated++;
      } else {
        await client.query(
          `INSERT INTO products (name, description, price, original_price, discount, image_url, stock, rating, reviews_count, category_id, shop_id, type)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
          [product.name, product.description, product.price, product.original_price, product.discount, 
           product.image_url, product.stock, product.rating, product.reviews_count, categoryId, shopId, product.type]
        );
        inserted++;
      }
    }

    console.log(`✓ Products: ${inserted} inserted, ${updated} updated, ${skipped} skipped`);

    // 5. Insert banners
    await client.query(`
      INSERT INTO banners (title, subtitle, image_url, link_url, is_active, position) VALUES
      ('iPhone 14 Series', 'Up to 10% off Voucher', '/banners/banner1.png', '/products?category=phones', TRUE, 1),
      ('Gaming Accessories', 'Level up your setup', '/banners/banner2.png', '/products?category=gaming', TRUE, 2),
      ('Smart Home Sale', 'Transform your living space', '/banners/banner3.png', '/products?category=smart-home', TRUE, 3),
      ('Tech Paradise Deals', 'Premium gadgets at unbeatable prices', '/banners/banner4.png', '/products?type=best-seller', TRUE, 4)
      ON CONFLICT DO NOTHING;
    `);
    console.log('✓ Banners created');

    // Summary
    const counts = await Promise.all([
      client.query('SELECT COUNT(*) FROM products'),
      client.query('SELECT COUNT(*) FROM shops'),
      client.query('SELECT COUNT(*) FROM banners'),
      client.query('SELECT COUNT(*) FROM categories')
    ]);

    console.log('\n📊 Final Database Summary:');
    console.log(`   Products:   ${counts[0].rows[0].count}`);
    console.log(`   Shops:      ${counts[1].rows[0].count}`);
    console.log(`   Banners:    ${counts[2].rows[0].count}`);
    console.log(`   Categories: ${counts[3].rows[0].count}`);
    console.log('\n✨ Seeding completed successfully!\n');

  } catch (error) {
    console.error('\n❌ Seeding failed:', error.message);
    console.error('Details:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
