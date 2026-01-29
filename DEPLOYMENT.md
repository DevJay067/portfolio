# Jay Magar Portfolio - Vercel Deployment Guide

## 🚀 Deploy to Vercel (Step-by-Step)

### Method 1: Using Vercel Dashboard (Easiest)

1. **Push your code to GitHub**
```bash
cd /app
git init
git add .
git commit -m "Portfolio ready for deployment"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. **Deploy on Vercel**
   - Go to https://vercel.com and sign in
   - Click **"Add New..."** → **"Project"**
   - Click **"Import"** on your GitHub repository
   
3. **⚠️ CRITICAL: Configure These Settings**
   
   **General Settings:**
   - Root Directory: `frontend` ← **MUST SET THIS!**
   - Framework Preset: `Create React App` (auto-detected)
   - Node.js Version: `18.x` (recommended)
   
   **Build & Development Settings:**
   - Build Command: `yarn build` or `npm run build`
   - Output Directory: `build`
   - Install Command: `yarn install` or `npm install`
   
4. Click **"Deploy"**

### Method 2: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to frontend folder
cd /app/frontend

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

When prompted:
- Set up and deploy? `Y`
- Which scope? Choose your account
- Link to existing project? `N`
- Project name? `jay-magar-portfolio` (or your choice)
- In which directory is your code located? `./`
- Override settings? `N`

## 🔧 Fixing 404 Errors

If you're seeing `404: NOT_FOUND` after deployment:

### Solution 1: Check Root Directory
1. Go to Vercel Dashboard → Your Project → **Settings** → **General**
2. Find **"Root Directory"**
3. Set it to: `frontend`
4. Click **"Save"**
5. Go to **Deployments** tab
6. Click **"..."** on the latest deployment
7. Click **"Redeploy"**

### Solution 2: Manual Override
In Vercel project settings:
- Go to **Settings** → **Build & Development Settings**
- Click **"Override"** if not already enabled
- Set:
  - Build Command: `yarn build`
  - Output Directory: `build`
  - Install Command: `yarn install`
- **Save** and **Redeploy**

### Solution 3: Environment Variables
If still not working, add this environment variable in Vercel:
- Key: `CI`
- Value: `false`

Then redeploy.

## 📁 Project Structure for Vercel

Your repository should look like this:
```
/
├── frontend/          ← Vercel deploys from here
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── build/         ← Output after build
├── backend/           ← Not used for this deployment
└── README.md
```

## ✅ What's Included

- Fully responsive design
- Dark/Light mode toggle
- 3D animations and particle effects
- Contact form (frontend-only)
- Working social links (GitHub, LinkedIn)
- Live project demos (HealthChain AI, EOD Rover)

## 🐛 Troubleshooting

### Build Fails
```bash
# Test build locally first
cd /app/frontend
yarn install
yarn build

# Check for errors
# Fix any errors before deploying
```

### Blank Page After Deploy
1. Check browser DevTools console for errors
2. Verify the build output exists: `/app/frontend/build/index.html`
3. Check Network tab to see what's being loaded

### Assets Not Loading
- All images use full URLs (Unsplash, customer-assets)
- No relative paths that could break
- Check CORS if images fail to load

## 📞 Need Help?

1. Check Vercel build logs for specific errors
2. Verify Node.js version (16.x or 18.x recommended)
3. Ensure all dependencies are listed in `package.json`
4. Try deleting `node_modules` and `yarn.lock`, then reinstall

## 🎉 After Successful Deployment

Your portfolio will be live at: `https://your-project.vercel.app`

You can also add a custom domain in Vercel settings!

---

**Important:** This is a static frontend app. No backend, database, or environment variables needed!
