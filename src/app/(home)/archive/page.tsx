import ArchivedNotesWrapped from "@/components/ArchivedNotesWrapped";
import useRedirect from "@/hooks/useRedirect";
import ArchiveIcon from "@/icons/ArchiveIcon";

export default async function page() {
  await useRedirect();
  return (
    <section className="p-4">
      <div className="flex items-center gap-2">
        <ArchiveIcon width={24} height={24} stroke="" strokeWidth={3} />
        <h1 className="text-3xl font-bold">Archivados</h1>
      </div>
      <hr className="h-px my-4 bg-gray-300 border-0"></hr>
      <ArchivedNotesWrapped />
    </section>
  );
}
