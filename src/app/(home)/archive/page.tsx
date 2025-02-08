import ArchivedNotesWrapped from "@/components/ArchivedNotesWrapped";
import useRedirect from "@/hooks/useRedirect";
import ArchiveIcon from "@/icons/ArchiveIcon";
import { createClient } from "@/config/supabaseServer";

export default async function Page() {
  useRedirect();
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user;
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
