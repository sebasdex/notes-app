"use client";
import ModalConfirm from "@/components/ModalConfirm";
import { useEffect } from "react";
import { useTrashNoteActions } from "@/hooks/useTrashNoteActions";
import DateIcon from "@/icons/DateIcon";
import TimeIcon from "@/icons/TimeIcon";
import TrashIcon from "@/icons/TrashIcon";
import ReturnIcon from "@/icons/ReturnIcon";
import ArchiveIcon from "@/icons/ArchiveIcon";
import { User } from "@supabase/supabase-js";

function TrashNotes({ user }: { user: User | null }) {
  const {
    setIsAlertDelete,
    getTrashNotes,
    isAlertDelete,
    handleDeleteConfirm,
    notesDeleted,
    handleDelete,
  } = useTrashNoteActions();
  useEffect(() => {
    getTrashNotes(user as User);
  }, []);

  return (
    <>
      <ModalConfirm
        isAlertDelete={isAlertDelete}
        setIsAlertDelete={setIsAlertDelete}
        onConfirm={handleDeleteConfirm}
        message="Todos los datos se perderán permanentemente."
      />
      <section className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-4">
        {notesDeleted.map((note, index) => (
          <div
            key={note.id}
            className={`relative p-4 focus-within:ring-2 focus-within:ring-black rounded-lg w-full transform opacity-0 translate-y-10 animate-slide-in ${note.noteColor}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex justify-between px-2 py-2 rounded-lg text-white/60 text-sm font-semibold">
              <div className="flex items-center gap-2">
                <DateIcon />
                <span>{note.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <TimeIcon />
                <span>{note.hour}</span>
              </div>
            </div>
            <hr className="opacity-30 mx-2" />
            {/* Textarea */}
            <textarea
              name="note"
              id={`note-${note.id}`}
              className={`text-white text-lg placeholder-white/80 p-4
             rounded-md w-full h-48 resize-none border-none outline-none ${note.noteColor} disabled:cursor-not-allowed`}
              value={note.textNote}
              autoFocus
              disabled={true}
            ></textarea>
            {/* Footer */}
            <div className="flex justify-between mt-4 px-2 py-2 rounded-lg bg-white/20 backdrop-blur-md">
              {/* Delete Icon */}
              <button
                onMouseDown={(e) => e.preventDefault()}
                aria-label="delete note"
                onClick={() => handleDelete(note.id)}
                className={`w-10 h-10 flex items-center justify-center rounded-full bg-${note.noteColor}-700/80 hover:bg-${note.noteColor}-600  transition-transform transform hover:scale-110`}
              >
                <TrashIcon
                  width={24}
                  height={24}
                  strokeWidth={2}
                  stroke="white"
                />
              </button>
              {/* Archive Icon */}
              <button
                onMouseDown={(e) => e.preventDefault()}
                aria-label="archive note"
                className={`w-10 h-10 flex items-center justify-center rounded-full bg-${note.noteColor}-700/80 hover:bg-${note.noteColor}-600  transition-transform transform hover:scale-110`}
              >
                <ArchiveIcon stroke="white" />
              </button>
              {/* Return Icon */}
              <button
                onMouseDown={(e) => e.preventDefault()}
                aria-label="return note"
                className={`w-10 h-10 flex items-center justify-center rounded-full bg-${note.noteColor}-700/80 hover:bg-${note.noteColor}-600  transition-transform transform hover:scale-110`}
              >
                <ReturnIcon />
              </button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default TrashNotes;
