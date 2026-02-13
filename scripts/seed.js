import { config } from 'dotenv';
import pg from 'pg';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function seedDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('🌱 Starting database seeding...');
    
    const seedSQL = readFileSync(join(__dirname, '../db/seed_complete.sql'), 'utf8');
    
    await client.query(seedSQL);
    
    console.log('✅ Database seeded successfully!');
    
    // Verify the data
    const productsResult = await client.query('SELECT COUNT(*) FROM products');
    const shopsResult = await client.query('SELECT COUNT(*) FROM shops');
    const bannersResult = await client.query('SELECT COUNT(*) FROM banners');
    const categoriesResult = await client.query('SELECT COUNT(*) FROM categories');
    
    console.log('\n📊 Database Summary:');
    console.log(`   Products: ${productsResult.rows[0].count}`);
    console.log(`   Shops: ${shopsResult.rows[0].count}`);
    console.log(`   Banners: ${bannersResult.rows[0].count}`);
    console.log(`   Categories: ${categoriesResult.rows[0].count}`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

seedDatabase()
  .then(() => {
    console.log('\n✨ Seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to seed database:', error);
    process.exit(1);
  });
