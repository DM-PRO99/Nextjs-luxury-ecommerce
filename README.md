# Luxury Timepieces E-commerce

Luxury watch e-commerce built with Next.js 13, NextAuth, MongoDB, and Tailwind CSS.

## 🚀 Features

- ✅ **Complete authentication** with NextAuth (Credentials Provider)
- ✅ **MongoDB database** with Mongoose
- ✅ **Luxury design** with dark theme and animations
- ✅ **Functional shopping cart** with Zustand
- ✅ **Modern UI components** with Tailwind CSS
- ✅ **Smooth animations** with Framer Motion
- ✅ **Icons** with Lucide React
- ✅ **Full TypeScript** typing

## 📋 Prerequisites

- Node.js 18+ installed
- MongoDB installed locally or MongoDB Atlas account
- npm or yarn

## 🔧 Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the project root:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/nextauth-ecommerce
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-generate-with-openssl-rand-base64-32

# Email Configuration (Optional)
EMAIL_SERVER=smtp://username:password@smtp.example.com:587
EMAIL_FROM=noreply@example.com
```

### 3. Generate NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

### 4. Start MongoDB

If using local MongoDB:

```bash
mongod
```

If using MongoDB Atlas, make sure your cluster is active and you have the correct URI.

## 🏃 Running the Application

### Development mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production mode

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── auth/          # Authentication routes
│   ├── store/             # E-commerce pages
│   │   ├── checkout/      # Checkout page
│   │   └── collection/    # Collection page
│   ├── login/             # Login page
│   ├── register/          # Register page
│   └── dashboard/         # User dashboard
├── components/
│   ├── cart/              # Cart components
│   ├── luxury/            # Product components
│   ├── store/             # Header and navigation
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom hooks (cart, scroll)
├── libs/                  # Utilities and configuration
│   ├── mongodb.ts         # MongoDB connection
│   ├── mock-data.ts       # Sample data
│   └── utils.ts           # Helper functions
├── models/                # Mongoose models
│   └── user.ts            # User model
└── types/                 # TypeScript types
    └── products.ts        # Product types
```

## 🔐 Authentication

The application uses **NextAuth** with **Credentials Provider** and **MongoDB**:

- **Register**: `/register` - Create a new account
- **Login**: `/login` - Sign in
- **Profile**: `/dashboard/profile` - Protected page (requires authentication)

Users are stored in MongoDB with:
- Email (unique)
- Password (hashed with bcrypt)
- Fullname
- Timestamps (createdAt, updatedAt)

## 🛒 E-commerce

### Cart features:
- Add/remove products
- Update quantities
- localStorage persistence (Zustand)
- Animated side drawer
- Automatic total calculation

### Products:
- Product cards with images
- Quick add from card
- Ratings and reviews
- Discounted prices
- Badges (NEW, discount %)

## 🎨 Design

### Color theme:
- **Obsidian**: `rgb(15, 15, 20)` - Dark background
- **Platinum**: `rgb(245, 245, 250)` - Light text
- **Champagne**: `rgb(212, 175, 55)` - Gold accent
- **Gold**: `rgb(255, 215, 0)` - Gradients

### Fonts:
- **Playfair Display** - Serif for titles
- **Inter** - Sans-serif for body text

## 🛠️ Technologies

- **Next.js 13** - React framework with App Router
- **TypeScript** - Static typing
- **NextAuth** - Authentication
- **MongoDB + Mongoose** - Database
- **Tailwind CSS** - Styling
- **Zustand** - Global state (cart)
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Bcrypt** - Password hashing

## 📝 Notes

- Current products are sample data (`mock-data.ts`)
- For production, connect to a real product database
- Configure an email provider for password recovery features
- Images use Unsplash as placeholder

## 🚀 Deploy

### Vercel (Recommended)

1. Upload project to GitHub
2. Connect with Vercel
3. Configure environment variables
4. Automatic deploy

### Other platforms

Make sure to configure:
- Environment variables
- Node.js 18+
- Build command: `npm run build`
- Start command: `npm start`
