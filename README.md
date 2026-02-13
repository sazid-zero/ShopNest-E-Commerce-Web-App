# ShopNest E-Commerce Web App

A modern, full-stack e-commerce application built with Next.js 15, PostgreSQL, and Firebase Authentication.

## 🚀 Features

### 🛒 Customer Experience
-   **Modern UI/UX**: Responsive design with staggered scroll animations (`Framer Motion`) and premium fade transitions (`Swiper`).
-   **Product Discovery**: 
    -   Dynamic Banner Carousel linking to featured products.
    -   Featured Section with video-game style cards.
    -   Advanced Filtering (Category, Type, Price Range, Sort Order).
-   **Shopping**: 
    -   Cart functionality with persistent storage.
    -   Wishlist management.
    -   Secure Checkout flow.
-   **Account**: 
    -   User Profile management.
    -   Order History.

### 👨‍💼 Seller / Admin Dashboard
-   **Role-Based Access**: Dedicated dashboards for Customers, Sellers, and Admins.
-   **Seller Tools**:
    -   Product Management (Create, Edit, Delete).
    -   Order Management.
    -   Sales Analytics.
-   **Admin Control**: 
    -   User Management.
    -   Platform Overview.

### 🔒 Security & Backend
-   **Authentication**: Firebase Auth (Google & Email/Password) with role-based route protection.
-   **Database**: PostgreSQL (Neon/Vercel) with relation mappings for Users, Shops, Products, Orders, and Reviews.
-   **API**: Next.js App Router API endpoints for secure data fetching.

## 🛠️ Tech Stack

-   **Frontend**: Next.js 15, React, Tailwind CSS, Framer Motion, Lucide React, Swiper.
-   **Backend**: Next.js API Routes, PostgreSQL (`pg` driver).
-   **Auth**: Firebase Authentication, Firebase Admin SDK.
-   **Deployment**: Vercel.

## 📦 Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/shopnest.git
    cd shopnest
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env.local` file with the following:
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=...
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
    # ... other Firebase config
    DATABASE_URL=postgresql://...
    FIREBASE_ADMIN_PRIVATE_KEY=...
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

## 🌱 Database Seeding

To populate the database with initial products and banners:

1.  Ensure your `DATABASE_URL` is set.
2.  Run the seed endpoint:
    ```bash
    curl http://localhost:3000/api/seed-products
    ```

## 📁 Project Structure

-   `src/app`: App Router pages and API routes.
-   `src/components`: Reusable UI components (ProductCard, BannerCarousel, etc.).
-   `src/lib`: Utilities (DB connection, Firebase init).
-   `db/schema.sql`: Database schema definitions.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.
