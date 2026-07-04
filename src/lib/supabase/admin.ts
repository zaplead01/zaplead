import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL não foi definida."
  );
}

if (!serviceRoleKey) {
  throw new Error(
    "SUPABASE_SERVICE_ROLE_KEY não foi definida."
  );
}

console.log("==================================");
console.log("SUPABASE ADMIN");
console.log("URL:", supabaseUrl);
console.log(
  "SERVICE ROLE EXISTS:",
  !!serviceRoleKey
);
console.log(
  "SERVICE ROLE PREFIX:",
  serviceRoleKey.substring(0, 20)
);
console.log("==================================");

export const supabaseAdmin = createClient(
  supabaseUrl,
  serviceRoleKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);