// Your Project URL
const SUPABASE_URL = "https://hkejtonrjzvldgllqoqu.supabase.co";

// Your Publishable (Anon) Key
const SUPABASE_ANON_KEY = "sb_publishable_r3WI0FqEGpjihxvwzA1BLQ_ZqeFRgIN";

// Create Supabase Client
const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Check connection
console.log(client);
