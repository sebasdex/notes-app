import LoginWrapped from "@/components/LoginWrapped";
import { createClient } from "@/config/supabaseServer";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (data?.user) {
    redirect("/");
  }
  return <LoginWrapped />;
}
