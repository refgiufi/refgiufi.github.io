// Supabase Configuration Template
// This file will be replaced by GitHub Actions with actual secrets

window.SUPABASE_CONFIG = {
  url: 'YOUR_SUPABASE_URL_HERE',
  anonKey: 'YOUR_SUPABASE_ANON_KEY_HERE'
};

// Development mode detection
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  console.log('🔧 Development mode detected');
  console.log('💡 To test locally, replace the values above with your actual Supabase credentials');
  console.log('🚀 In production, GitHub Actions will inject the real credentials securely');
}