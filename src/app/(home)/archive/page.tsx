import ArchivedNotesWrapped from "@/components/ArchivedNotesWrapped";
import ArchiveIcon from "@/icons/ArchiveIcon";
import { createClient } from "@/config/supabaseServer";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const user = data?.user;
  if (error || !data?.user) {
    redirect("/login");
  }
  return (
    <section className="p-4">
      <div className="flex items-center gap-2">
        <ArchiveIcon width={24} height={24} stroke="" strokeWidth={3} />
        <h1 className="text-3xl font-bold">Archivados</h1>
      </div>
      <hr className="h-px my-4 bg-gray-300 border-0"></hr>
      <ArchivedNotesWrapped user={user} />
    </section>
  );
}
