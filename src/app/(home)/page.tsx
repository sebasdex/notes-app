"use client";
import Note from "@/components/Note";
import NoteIcon from "@/icons/NoteIcon";
function page() {
  return (
    <section className="p-4">
      <div className="flex items-center gap-2">
        <NoteIcon width={"24"} height={"24"} />
        <h1 className="text-3xl font-bold">Mis notas</h1>
      </div>
      <hr className="h-px my-4 bg-gray-300 border-0"></hr>
      <Note />
    </section>
  );
}

export default page;
