# Jay Magar Portfolio - Vercel Deployment Guide

## Quick Deploy Steps

### Option 1: Deploy from GitHub (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Portfolio ready"
git push origin main
```

2. **Import to Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - **Configure Project:**
     - Framework Preset: `Create React App`
     - Root Directory: `frontend`
     - Build Command: `yarn build` (or `npm run build`)
     - Output Directory: `build`
   - Click **Deploy**

### Option 2: Deploy via CLI

```bash
cd frontend
npm install -g vercel
vercel login
vercel --prod
```

## Common Issues & Solutions

### 404 Error After Deployment

**Solution:**
1. In Vercel Dashboard → Your Project → Settings → General
2. Set **Root Directory** to: `frontend`
3. Go to Settings → Build & Development Settings
4. Verify:
   - Framework Preset: `Create React App`
   - Build Command: `yarn build`
   - Output Directory: `build`
5. Go to Deployments → Click "..." on latest → Redeploy

### Build Fails

**Check:**
- Node.js version is 16.x or higher
- All dependencies are in `package.json`
- Run `cd frontend && yarn install && yarn build` locally first

### Blank Page After Deploy

**Solution:**
- Check browser console for errors
- Verify `homepage` is not set in `package.json` (or set to `/`)
- Clear Vercel cache and redeploy

## What This Portfolio Includes

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark/Light theme toggle
- ✅ 3D animations and effects
- ✅ Contact form (frontend-only, shows alerts)
- ✅ Working social links (GitHub, LinkedIn)
- ✅ Project links (HealthChain AI, EOD Rover)
- ✅ Particle background animations

## No Backend Required

This is a static frontend portfolio - no database or API setup needed!

---

For more help, see: https://vercel.com/docs/frameworks/create-react-app
