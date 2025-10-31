# 🔧 Development Setup Guide

## 📁 Environment Configuration

### Method 1: .env.local File (Recommended)

1. **Copy template:**
   ```bash
   cp .env.example .env.local
   ```

2. **Edit .env.local:**
   ```env
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **Serve locally:**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

4. **Access:** `http://localhost:8000`

### Method 2: localStorage Panel

1. Open admin interface: `http://localhost:8000/admin/dashboard.html`
2. Fill configuration panel with your Supabase credentials
3. Click "Save Configuration"
4. Credentials stored in browser localStorage

## 🌍 Environment Detection

The system automatically detects:

- **Development:** `localhost` or `127.0.0.1`
  - Loads from `.env.local` → localStorage → manual config
  
- **Production:** GitHub Pages
  - Loads from GitHub Actions injected config

## 🔄 Configuration Priority

### Development Mode:
1. ✅ `.env.local` file (highest priority)
2. ✅ localStorage (browser storage)
3. ✅ Manual configuration panel

### Production Mode:
1. ✅ GitHub Actions injected secrets
2. ❌ Fallback to error if injection fails

## 🛠️ Local Development Workflow

1. **Clone repository**
2. **Setup environment:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with real credentials
   ```
3. **Start local server**
4. **Access admin interfaces:**
   - Dashboard: `http://localhost:8000/admin/dashboard.html`
   - Testing: `http://localhost:8000/admin/testing.html`
   - Debug: `http://localhost:8000/debug-config.html`

## 🔐 Security Notes

- ✅ `.env.local` is gitignored (safe for local dev)
- ✅ Production uses GitHub Secrets (encrypted)
- ✅ No credentials in repository code
- ✅ Automatic environment detection

## 🚀 Production Deployment

Handled automatically by GitHub Actions:
1. Push to `master` branch
2. GitHub Actions injects secrets
3. Deploys to GitHub Pages
4. Production config loaded securely