import HomePage from "@/components/HomePage";
import { createClient } from "@/config/supabaseServer";

export default async function page() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  return <HomePage user={data.user} />;
}
