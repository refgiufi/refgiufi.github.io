// Environment Configuration Loader
// Supports .env files for local development and GitHub Actions for production

class ConfigLoader {
  constructor() {
    this.config = {
      url: null,
      anonKey: null,
      isProduction: window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1',
      isDevelopment: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    };
    
    this.loadConfig();
  }

  async loadConfig() {
    console.log(`🌍 Environment: ${this.config.isProduction ? 'Production' : 'Development'}`);
    
    if (this.config.isDevelopment) {
      await this.loadDevelopmentConfig();
    } else {
      this.loadProductionConfig();
    }
    
    this.validateConfig();
  }

  async loadDevelopmentConfig() {
    console.log('🔧 Loading development configuration...');
    
    // Try to load from local config script (if exists)
    if (window.DEV_CONFIG) {
      this.config.url = window.DEV_CONFIG.SUPABASE_URL;
      this.config.anonKey = window.DEV_CONFIG.SUPABASE_ANON_KEY;
      console.log('✅ Loaded config from dev-config.js');
      return;
    }
    
    // Fallback to localStorage
    const url = localStorage.getItem('supabaseUrl') || localStorage.getItem('sb_url');
    const key = localStorage.getItem('supabaseKey') || localStorage.getItem('sb_key');
    
    if (url && key) {
      this.config.url = url;
      this.config.anonKey = key;
      console.log('✅ Loaded config from localStorage');
      return;
    }
    
    console.log('⚠️ No development config found. Please:');
    console.log('1. Create dev-config.js file with your credentials, OR');
    console.log('2. Use the configuration panel in admin interface');
  }

  loadProductionConfig() {
    console.log('🚀 Loading production configuration...');
    
    // Load from GitHub Actions injected config
    if (window.SUPABASE_CONFIG) {
      const config = window.SUPABASE_CONFIG;
      
      // Check if real values were injected (not template)
      if (config.url && config.anonKey && 
          config.url !== 'YOUR_SUPABASE_URL_HERE' && 
          config.anonKey !== 'YOUR_SUPABASE_ANON_KEY_HERE' &&
          config.url.startsWith('http')) {
        
        this.config.url = config.url;
        this.config.anonKey = config.anonKey;
        console.log('✅ Loaded config from GitHub Actions');
        return;
      }
    }
    
    console.error('❌ Production config injection failed!');
    console.log('🔧 Check GitHub Secrets and workflow deployment');
  }

  validateConfig() {
    const isValid = this.config.url && 
                   this.config.anonKey && 
                   this.config.url.startsWith('http') && 
                   this.config.anonKey.length > 20;
    
    if (isValid) {
      console.log('✅ Configuration validated successfully');
      this.config.isValid = true;
    } else {
      console.error('❌ Invalid configuration detected');
      this.config.isValid = false;
      
      if (this.config.isDevelopment) {
        console.log('💡 Development setup instructions:');
        console.log('1. Copy .env.example to .env.local');
        console.log('2. Fill in your Supabase credentials');
        console.log('3. Refresh the page');
      }
    }
  }

  getConfig() {
    return {
      url: this.config.url,
      anonKey: this.config.anonKey,
      isValid: this.config.isValid,
      isProduction: this.config.isProduction,
      isDevelopment: this.config.isDevelopment
    };
  }

  // Helper method to create Supabase client
  createSupabaseClient() {
    if (!this.config.isValid) {
      throw new Error('Invalid Supabase configuration. Please check your setup.');
    }
    
    if (typeof window.supabase === 'undefined') {
      throw new Error('Supabase client library not loaded');
    }
    
    return window.supabase.createClient(this.config.url, this.config.anonKey);
  }
}

// Export for use in other files
window.ConfigLoader = ConfigLoader;