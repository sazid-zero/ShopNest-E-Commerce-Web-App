import { auth } from './firebase-admin';
import pool from './db';

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role: 'customer' | 'seller' | 'admin';
}

export async function verifyAndSyncUser(token: string): Promise<AuthUser | null> {
  try {
    const decodedToken = await auth.verifyIdToken(token);
    const { uid, email, name } = decodedToken;

    if (!email) throw new Error("Email missing in token");

    // Sync with local DB using ON CONFLICT for efficiency
    const client = await pool.connect();
    try {
      // First, check if the user exists and what their role is
      const userRes = await client.query("SELECT role FROM users WHERE id = $1", [uid]);
      let role: 'customer' | 'seller' | 'admin' = 'customer';

      if (userRes.rows.length > 0) {
        role = userRes.rows[0].role;
      } else if (email === 'admin@shopnest.com') {
        role = 'admin';
      }

      // Sync user data
      const res = await client.query(
        `INSERT INTO users (id, email, name, role) 
         VALUES ($1, $2, $3, $4) 
         ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email, name = EXCLUDED.name
         RETURNING id, email, name, role`,
        [uid, email, name || null, role]
      );
      
      const user = res.rows[0];
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      };
    } finally {
      client.release();
    }

  } catch (error) {
    console.error("Auth verification failed:", error);
    return null;
  }
}
