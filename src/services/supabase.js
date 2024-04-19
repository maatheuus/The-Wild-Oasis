import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://rpgcosfdwcyfrhyslzgk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwZ2Nvc2Zkd2N5ZnJoeXNsemdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0NjMyNTUsImV4cCI6MjAyOTAzOTI1NX0.t3Gv2Wl84uXxt_NRWnMAqpJLGDYxAOJI1rPKkXQ0Ndo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
