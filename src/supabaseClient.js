// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase URL and API Key
const SUPABASE_URL = 'https://hwhwcqocrdidmwixrlil.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3aHdjcW9jcmRpZG13aXhybGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5ODc1OTMsImV4cCI6MjA0MTU2MzU5M30.ZvoeulclLUddd92a9tdvUb905dEvLoiFqRafEEpibZk';

// Create a Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
