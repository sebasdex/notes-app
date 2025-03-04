import { createClient } from "@/config/supabaseServer";
import NavClient from "@/components/NavClient";
import { User } from "@supabase/supabase-js";

export default async function Nav() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return <NavClient user={data.user as User} />;
}
