"use client";
import Link from "next/link";
import { useNoteAppContext } from "@/context/useContextNoteApp";
import { v4 as uuidv4 } from "uuid";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
function SideBar() {
  const pathname = usePathname();
  const router = useRouter();
  const addIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-square-plus bg-black text-white rounded-md"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  );
  const archiveIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-archive"
    >
      <rect width="20" height="5" x="2" y="3" rx="1" />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
      <path d="M10 12h4" />
    </svg>
  );
  const trashIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
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
  const colorButtons = ["bg-yellow-500", "bg-blue-500", "bg-red-500"];
  const { setTextNotes, textNotes } = useNoteAppContext();
  const addNote = (color: string) => {
    if (pathname === "/trash" || pathname === "/archive") {
      router.push("/");
      setTextNotes((prev) => {
        const addNote = [
          ...prev,
          { id: uuidv4(), text: "", noteColor: color, isDone: false },
        ];
        localStorage.setItem("textNotes", JSON.stringify(addNote));
        return addNote;
      });
    } else {
      setTextNotes((prev) => {
        const addNote = [
          ...prev,
          { id: uuidv4(), text: "", noteColor: color, isDone: false },
        ];
        localStorage.setItem("textNotes", JSON.stringify(addNote));
        return addNote;
      });
    }
  };
  return (
    <section className="sidebar">
      <ul className=" flex justify-center gap-12 w-full md:flex-col md:gap-10 md:justify-between md:w-auto">
        <li className="flex flex-col items-center gap-4">
          <Link href={"/"} className="gap-4">
            <span aria-hidden="true">{addIcon}</span>
          </Link>
          <ul className="flex gap-2 md:flex-col">
            {colorButtons.map((color, index) => (
              <li className="flex items-center" key={index}>
                <button
                  onClick={() => addNote(color)}
                  aria-label={`Add ${color}`}
                  className={`h-5 w-5 rounded-full ${color} hover:border-2 border-gray-300`}
                ></button>
              </li>
            ))}
          </ul>
        </li>
        <li className="text-gray-400 md:flex-row group hover:text-gray-700">
          <Link href="/archive" className="flex flex-col items-center gap-2">
            <span className="group-hover:cursor-pointer">{archiveIcon}</span>
            <span>Archive</span>
          </Link>
        </li>
        <li className=" text-gray-400 md:flex-row group hover:text-gray-700">
          <Link href="/trash" className="flex flex-col items-center gap-2">
            <span className="group-hover:cursor-pointer">{trashIcon}</span>
            <span>Trash</span>
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default SideBar;
