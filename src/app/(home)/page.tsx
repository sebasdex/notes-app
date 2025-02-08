import HomePage from "@/components/HomePage";
import { createClient } from "@/config/supabaseServer";

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return <HomePage user={data.user} />;
}
