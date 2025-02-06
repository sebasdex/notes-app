"use client";
import Link from "next/link";
import { useNoteAppContext } from "@/context/useContextNoteApp";
import { v4 as uuidv4 } from "uuid";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import TrashIcon from "@/icons/TrashIcon";
import ArchiveIcon from "@/icons/ArchiveIcon";
import AddIcon from "@/icons/AddIcon";
import { createClient } from "@/config/supabaseClient";

function SideBar() {
  const pathname = usePathname();
  const router = useRouter();
  const colorButtons = ["bg-yellow-500", "bg-blue-500", "bg-red-500"];
  const { setTextNotes } = useNoteAppContext();
  const dateNoteCreate = new Date().toLocaleDateString("es-ES");
  const hourDateCreate = new Date().toLocaleTimeString("es-ES");

  const addNote = async (color: string) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (pathname === "/trash" || pathname === "/archive") {
      router.push("/");
    }
    const newNote = {
      id: uuidv4(),
      textNote: "",
      noteColor: color,
      isProtected: false,
      isArchived: false,
      isDeleted: false,
      date: dateNoteCreate,
      hour: hourDateCreate,
    };

    if (!data?.user?.id) {
      setTextNotes((prev) => {
        const updatedNotes = [...prev, newNote];
        localStorage.setItem("textNotes", JSON.stringify(updatedNotes));
        return updatedNotes;
      });
      return;
    }

    try {
      setTextNotes((prev) => [...prev, newNote]);
      const response = await fetch("/api/newNote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Error desconocido al insertar notas");
      }
    } catch (error) {
      console.error("❌ Error al sincronizar notas:", error);
    }
  };

  return (
    <section className="sidebar">
      <ul className=" flex justify-center gap-12 w-full md:flex-col md:gap-10 md:justify-between md:w-auto">
        <li className="flex flex-col items-center gap-4">
          <Link href={"/"} className="gap-4">
            <AddIcon />
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
            <span className="group-hover:cursor-pointer">
              <ArchiveIcon width={24} height={24} stroke="" strokeWidth={2} />
            </span>
            <span>Archive</span>
          </Link>
        </li>
        <li className=" text-gray-400 md:flex-row group hover:text-gray-700">
          <Link href="/trash" className="flex flex-col items-center gap-2">
            <span className="group-hover:cursor-pointer">
              <TrashIcon width={24} height={24} stroke="" strokeWidth={2} />
            </span>
            <span>Trash</span>
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default SideBar;
