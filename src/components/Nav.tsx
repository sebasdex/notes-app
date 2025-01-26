import { createClient } from "@/config/supabaseServer";
import NavClient from "@/components/NavClient";

export default async function Nav() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  return <NavClient user={data.user} />;
}
