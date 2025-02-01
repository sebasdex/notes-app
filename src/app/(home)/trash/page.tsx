import TrashNotes from "@/components/TrashNotes";
import TrashIcon from "@/icons/TrashIcon";

function page() {
  return (
    <section className="p-4">
      <div className="flex items-center gap-2">
        <TrashIcon width={24} height={24} stroke="" strokeWidth={3} />
        <h1 className="text-3xl font-bold">Mi papelera</h1>
      </div>
      <hr className="h-px my-4 bg-gray-300 border-0"></hr>
      <TrashNotes />
    </section>
  );
}

export default page;
