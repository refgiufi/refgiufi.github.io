# 🔧 Development Setup Guide

## 📁 Simple Development Configuration

### Method 1: dev-config.js (Recommended)

1. **Create dev-config.js in root folder:**
   ```javascript
   // Development Configuration
   window.DEV_CONFIG = {
     SUPABASE_URL: 'https://your-project-id.supabase.co',
     SUPABASE_ANON_KEY: 'your-anon-key-here'
   };
   ```

2. **Start local server:**
   ```bash
   python -m http.server 8000
   ```

3. **Access:** `http://localhost:8000/admin/dashboard.html`

### Method 2: localStorage Panel (Fallback)

1. Open: `http://localhost:8000/admin/dashboard.html`
2. Fill configuration panel with Supabase credentials
3. Click "Save Configuration"
4. Credentials stored in browser localStorage

## 🌍 Environment Detection

### Development Mode (localhost):
1. ✅ `dev-config.js` (auto-loaded, gitignored)
2. ✅ localStorage (browser storage)
3. ✅ Manual configuration panel

### Production Mode (GitHub Pages):
1. ✅ GitHub Actions injected secrets (encrypted)
2. ❌ dev-config.js not loaded (security)

## 🛠️ Quick Start

1. **Clone repository**
2. **Create dev-config.js with your Supabase credentials**
3. **Start server:** `python -m http.server 8000`
4. **Access admin:** `http://localhost:8000/admin/dashboard.html`

## 🔐 Security

- ✅ `dev-config.js` gitignored (safe for local dev)
- ✅ Only loads on localhost (not production)
- ✅ Production uses GitHub Secrets (encrypted)
- ✅ No credentials in repository

## 🚀 Production

Auto-handled by GitHub Actions:
1. Push to master → GitHub Actions runs
2. Injects secrets → Deploys to GitHub Pages
3. Production config loaded securely