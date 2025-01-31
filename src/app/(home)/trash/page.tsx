import TrashNotes from "@/components/TrashNotes";
function page() {
  const deleteIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="black"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-trash-2"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
  return (
    <section className="p-4">
      <div className="flex items-center gap-4">
        <span>{deleteIcon}</span>
        <h1 className="text-3xl font-bold">Mi papelera</h1>
      </div>
      <hr className="h-px my-4 bg-gray-300 border-0"></hr>
      <TrashNotes />
    </section>
  );
}

export default page;
