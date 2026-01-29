# NETLIFY DEPLOYMENT GUIDE

## ✅ CORRECT NETLIFY CONFIGURATION

### Method 1: Using Netlify Dashboard (Recommended)

**Step 1: Prepare Your Code**
```bash
# Make sure you're in the right directory
cd /app/frontend

# Test build locally
yarn build

# Verify build folder exists
ls -la build/
```

**Step 2: Deploy to Netlify**

1. Go to https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose your Git provider (GitHub/GitLab/Bitbucket)
4. Select your repository

**Step 3: Configure Build Settings**

⚠️ **CRITICAL SETTINGS:**

- **Base directory:** `frontend`
- **Build command:** `yarn build`
- **Publish directory:** `frontend/build`
- **Node version:** `18`

Click **"Deploy site"**

### Method 2: Using netlify.toml (Easier)

Create this file at the ROOT of your repository:

```toml
# /app/netlify.toml

[build]
  base = "frontend"
  command = "yarn build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Then just push to GitHub and Netlify will auto-deploy with correct settings!

### Method 3: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Navigate to frontend
cd /app/frontend

# Login
netlify login

# Initialize and deploy
netlify init

# Or deploy directly
netlify deploy --prod --dir=build
```

## 🔧 Fixing "Page not found" Error

### Solution 1: Add netlify.toml
Already created above! Just add it to your repo root.

### Solution 2: Update Site Settings

1. Go to Netlify Dashboard → Your Site
2. Click **"Site settings"** → **"Build & deploy"**
3. Under **"Build settings"**, click **"Edit settings"**
4. Set:
   - Base directory: `frontend`
   - Build command: `yarn build`
   - Publish directory: `frontend/build`
5. Click **"Save"**
6. Trigger new deploy: **"Deploys"** → **"Trigger deploy"** → **"Deploy site"**

### Solution 3: Check _redirects File

The `_redirects` file should already exist at `/app/frontend/public/_redirects`

Verify it contains:
```
/*    /index.html   200
```

This file will be copied to the build folder automatically and tells Netlify to handle client-side routing.

## 📁 Correct Repository Structure

For Netlify to work correctly, your structure should be:

**If deploying from monorepo:**
```
/
├── netlify.toml         ← ADD THIS!
├── frontend/
│   ├── public/
│   │   └── _redirects   ← ALREADY EXISTS
│   ├── src/
│   ├── package.json
│   └── build/
└── backend/
```

**If deploying frontend only:**
```
/
├── public/
│   └── _redirects       ← ALREADY EXISTS
├── src/
├── package.json
└── build/
```

## ✅ Quick Fix Checklist

- [ ] Created `netlify.toml` at repository root
- [ ] Set Base directory to `frontend` in Netlify settings
- [ ] Set Publish directory to `frontend/build`
- [ ] Verified `_redirects` file exists in `frontend/public/`
- [ ] Triggered a new deploy
- [ ] Checked deploy logs for errors

## 🎯 FASTEST SOLUTION

**Just add this file to your repo root and push:**

Save this as `/app/netlify.toml`:
```toml
[build]
  base = "frontend"
  command = "yarn build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Then:
```bash
cd /app
git add netlify.toml
git commit -m "Add Netlify config"
git push
```

Netlify will automatically redeploy with correct settings!

## 🐛 Still Having Issues?

### Check Build Logs
1. Go to Netlify Dashboard → Your Site → **Deploys**
2. Click on the latest deploy
3. Check **"Deploy log"** for errors

### Common Issues

**Build fails:**
- Node version too old → Set to 18 in netlify.toml
- Missing dependencies → Check package.json

**404 on routes:**
- Missing _redirects file → Already added!
- Wrong publish directory → Use `frontend/build`

**Blank page:**
- Check browser console for errors
- Verify build output exists locally

---

## 🎉 After Successful Deployment

Your portfolio will be live at: `https://your-site.netlify.app`

You can customize the domain in Netlify settings!
