import { createClient } from '@supabase/supabase-js'

// These values should come from environment variables, but we'll provide fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pnvdzxfwwtykzsgsicbb.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBudmR6eGZ3d3R5a3pzZ3NpY2JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5NDM2MjcsImV4cCI6MjA3MDUxOTYyN30.q7Vpt4DtdxBLXSpTlT9QVe055_1CdTeK0M-J8ZskTts'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
