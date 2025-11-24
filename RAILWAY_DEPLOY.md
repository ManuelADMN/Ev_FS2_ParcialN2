# Railway Deployment Guide - Denoise App

## Quick Deploy to Railway

### Prerequisites
- GitHub account
- Railway account (free): https://railway.app

### Step 1: Sign Up / Login
1. Go to https://railway.app
2. Click "Login with GitHub"
3. Authorize Railway

### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose repository: `ManuelADMN/Ev_FS2_ParcialN2`
4. Select branch: `deploy-fix`

### Step 3: Configure Environment Variables
Railway will auto-detect Node.js. Add one environment variable:

- **Key:** `JWT_SECRET`
- **Value:** `your-super-secret-jwt-key-change-in-production-2024`

### Step 4: Deploy
1. Railway will automatically start deploying
2. Wait for build to complete (~2-3 minutes)
3. Click on your deployment to see the URL

### Step 5: Verify
1. Open the Railway-provided URL
2. Test login: `admin@denoise.com` / `admin123`
3. Verify all endpoints work

## Configuration Files

- ✅ `railway.json` - Railway configuration
- ✅ `.nvmrc` - Node.js version (20.11.1)
- ✅ `package.json` - Dependencies and scripts

## Expected Build Output

```
==> Building with Nixpacks
==> Installing dependencies
==> Running: npm install && npm run build
==> Build successful
==> Starting: npm start
==> API listening on http://0.0.0.0:3000
```

## Troubleshooting

If deployment fails:
1. Check logs in Railway dashboard
2. Verify environment variables are set
3. Ensure branch is `deploy-fix`

## Benefits of Railway vs Render

- ✅ Simpler configuration
- ✅ Better Node.js support
- ✅ Clearer logs
- ✅ Faster deployments
- ✅ $5/month free credit
