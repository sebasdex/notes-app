"use client";
import Note from "@/components/Note";

function page() {
  return (
    <section className="p-4">
      <h1 className="text-3xl font-bold">Mis notas</h1>
      <hr className="h-px my-4 bg-gray-300 border-0"></hr>
      <Note />
    </section>
  );
}

export default page;
