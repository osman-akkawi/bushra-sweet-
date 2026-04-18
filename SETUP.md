# Boutique Sweets - Setup Guide

## Overview
- ✅ Firebase Firestore (free database)
- ✅ Images from /public folder (free)
- ✅ Vercel hosting (free)

## Firebase Setup (Database Only)

1. Go to https://console.firebase.google.com
2. Create project "sweet-boutique"
3. **Build → Firestore Database → Create Database**
   - Location: us-central1 (or any)
   - Start in **test mode** (no auth needed)
4. **Build → Storage → Get Started** → Cancel (we don't need it)

5. Get config: Project Settings → General → Add app (</>) → Copy config

## Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=sweet-boutique.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=sweet-boutique
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=sweet-boutique.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

## How to Add Menu Items

Since images are in `/public` folder, you just use the filename:

**Example image paths in /public:**
- `/baklava-category.jpg`
- `/mamoul-mixed.jpg`
- `/chocolate-sweet.jpg`
- etc.

When adding items in admin panel, just enter the path like: `/baklava-sada.jpg`

## Hosting

Deploy to Vercel (free):
```bash
npm run build
vercel deploy
```

## Admin Panel

- URL: `/admin`
- Password: `albochra123`
- Add categories and items
- Use image paths like `/image-name.jpg`

## Data Seeding

Visit `/admin/seed` to add sample menu data