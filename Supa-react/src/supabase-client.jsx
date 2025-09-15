import { createClient } from "@supabase/supabase-js"; 

let key = process.env.VITE_SUPABASE_KEY;
let api = process.env.VITE_SUPABASE_API

export const supabase = createClient(key, api)