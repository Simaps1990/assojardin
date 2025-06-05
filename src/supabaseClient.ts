import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xbwrfxacazfzvlgzaxfy.supabase.co'; // 🔁 remplace-moi
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhid3JmeGFjYXpmenZsZ3pheGZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4MTg0NTEsImV4cCI6MjA2NDM5NDQ1MX0.GTeDy0Ehbnb10yyUSEI91dIoryAwVt0QTaFTqKxTtiA'; // 🔁 remplace-moi avec ta clé API publique (non service_role)

export const supabase = createClient(supabaseUrl, supabaseKey);
