#!/bin/bash

echo "🚀 DEPLOYING JAY MAGAR PORTFOLIO TO VERCEL"
echo "==========================================="
echo ""

# Navigate to frontend
cd /app/frontend

echo "📁 Step 1: Checking frontend folder..."
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found!"
    exit 1
fi
echo "✅ Frontend folder ready"
echo ""

echo "📦 Step 2: Initializing Git repository..."
git init
echo "✅ Git initialized"
echo ""

echo "📝 Step 3: Adding all files..."
git add .
echo "✅ Files staged"
echo ""

echo "💾 Step 4: Creating commit..."
git commit -m "Portfolio ready for deployment"
echo "✅ Committed"
echo ""

echo "🌐 Step 5: Adding remote repository..."
echo ""
echo "⚠️  IMPORTANT: Create a NEW repository on GitHub first!"
echo "   1. Go to: https://github.com/new"
echo "   2. Repository name: jay-magar-portfolio"
echo "   3. Make it PUBLIC"
echo "   4. Do NOT add README, .gitignore, or license"
echo "   5. Click 'Create repository'"
echo ""
read -p "Press ENTER after you've created the repository..."

echo ""
read -p "Enter your GitHub repository URL (e.g., https://github.com/DevJay067/jay-magar-portfolio.git): " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "❌ No URL provided. Exiting..."
    exit 1
fi

git remote add origin "$REPO_URL"
echo "✅ Remote added"
echo ""

echo "📤 Step 6: Pushing to GitHub..."
git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🎉 SUCCESS!"
    echo "==========================================="
    echo "Your code is now on GitHub!"
    echo ""
    echo "📌 NEXT STEPS:"
    echo "1. Go to: https://vercel.com/new"
    echo "2. Click 'Import' on your repository: $REPO_URL"
    echo "3. Click 'Deploy'"
    echo "4. Wait 1-2 minutes"
    echo "5. Your portfolio will be live! 🚀"
    echo ""
    echo "Your Vercel URL will be: https://jay-magar-portfolio.vercel.app"
else
    echo "❌ Push failed. Please check your credentials and try again."
    echo ""
    echo "Troubleshooting:"
    echo "- Make sure you have GitHub authentication set up"
    echo "- Try: gh auth login"
    echo "- Or use SSH URL instead of HTTPS"
fi
