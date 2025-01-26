import { redirect } from "next/navigation";
import { createClient } from "@/config/supabaseServer";
const useRedirect = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return data?.user;
};

export default useRedirect;
