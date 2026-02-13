const { Pool } = require('pg');

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_I6Z5NujUOfid@ep-solitary-sun-a1lxtp9k-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
});

async function checkUsers() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT email, role FROM users');
    console.log(JSON.stringify(res.rows, null, 2));
  } finally {
    client.release();
    await pool.end();
  }
}

checkUsers();
