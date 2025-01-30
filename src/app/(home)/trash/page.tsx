import TrashNotes from "@/components/TrashNotes";

function page() {
  return (
    <section className="p-4">
      <h1 className="text-3xl font-bold">Mi papelera</h1>
      <hr className="h-px my-4 bg-gray-300 border-0"></hr>
      <TrashNotes />
    </section>
  );
}

export default page;
