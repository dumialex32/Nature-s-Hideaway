import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://hggwcxcmcukexjiqisjq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnZ3djeGNtY3VrZXhqaXFpc2pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc3NjYyMzYsImV4cCI6MjAyMzM0MjIzNn0.tatuIiiZnTVcqRVZeibbRAZZr0CEkkRzjNS0JriY_XA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
