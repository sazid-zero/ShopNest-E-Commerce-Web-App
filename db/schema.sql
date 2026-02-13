-- Users table (Managed by Firebase Auth)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY, -- Firebase UID
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  role TEXT DEFAULT 'customer', -- customer, seller, admin
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  icon TEXT, -- Lucide icon name or image path
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Shops table (Multi-vendor support)
CREATE TABLE IF NOT EXISTS shops (
  id SERIAL PRIMARY KEY,
  owner_id TEXT NOT NULL REFERENCES users(id),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  logo_url TEXT,
  cover_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Products table (Enhanced)
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  shop_id INTEGER REFERENCES shops(id), -- Null if system-owned
  category_id INTEGER REFERENCES categories(id),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  discount INTEGER DEFAULT 0,
  image_url TEXT,
  stock INTEGER NOT NULL DEFAULT 0,
  type TEXT, -- e.g., 'flash-sale', 'best-seller'
  rating DECIMAL(3, 2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- Banners table (CMS for home page)
CREATE TABLE IF NOT EXISTS banners (
  id SERIAL PRIMARY KEY,
  title TEXT,
  subtitle TEXT,
  image_url TEXT NOT NULL,
  link_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  total DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, paid, shipped, cancelled
  stripe_session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Order Items table
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL -- Price at time of purchase
);

-- Cart table (Persistent cart for logged-in users)
CREATE TABLE IF NOT EXISTS cart (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY (user_id, product_id)
);

