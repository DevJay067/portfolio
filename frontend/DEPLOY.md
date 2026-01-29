# DEPLOY TO VERCEL - STEP BY STEP COMMANDS

## Run these commands exactly:

```bash
# Step 1: Go to frontend folder
cd /app/frontend

# Step 2: Initialize git (if not already done)
git init

# Step 3: Add all files
git add .

# Step 4: Commit
git commit -m "Portfolio ready for deployment"

# Step 5: Create a NEW repository on GitHub
# Go to: https://github.com/new
# Repository name: jay-magar-portfolio
# Make it Public
# Do NOT initialize with README (we already have files)
# Click "Create repository"

# Step 6: Add remote (REPLACE with your actual repo URL)
git remote add origin https://github.com/DevJay067/jay-magar-portfolio.git

# Step 7: Push to GitHub
git branch -M main
git push -u origin main

# Step 8: Deploy to Vercel
# Go to: https://vercel.com/new
# Click "Import" on your new repository
# Click "Deploy"
# ✅ DONE! Your site will be live in 1-2 minutes
```

## After Deployment

Your portfolio will be live at: `https://jay-magar-portfolio.vercel.app`

You can customize the domain in Vercel settings!

## Troubleshooting

If you get "remote already exists" error:
```bash
git remote remove origin
git remote add origin https://github.com/DevJay067/jay-magar-portfolio.git
```

If you get authentication error:
- Use GitHub CLI: `gh auth login`
- Or use Personal Access Token instead of password
