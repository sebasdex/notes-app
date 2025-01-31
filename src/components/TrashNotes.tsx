"use client";
import ModalConfirm from "@/components/ModalConfirm";
import { useEffect } from "react";
import { useTrashNoteActions } from "@/hooks/useTrashNoteActions";
function TrashNotes() {
  const {
    setIsAlertDelete,
    deleteIcon,
    returnIcon,
    setNotesDeleted,
    isAlertDelete,
    handleDeleteConfirm,
    notesDeleted,
    handleDelete,
  } = useTrashNoteActions();
  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem("notesDeleted") || "[]");
    if (notes.length > 0) {
      setNotesDeleted(notes);
    }
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
            {/* Textarea */}
            <textarea
              name="note"
              id={`note-${note.id}`}
              className={`text-white text-lg placeholder-white/80 p-4
             rounded-md w-full h-48 resize-none border-none outline-none ${note.noteColor} disabled:cursor-not-allowed`}
              value={note.text}
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
                {deleteIcon}
              </button>
              {/* Return Icon */}
              <button
                onMouseDown={(e) => e.preventDefault()}
                aria-label="return note"
                className={`w-10 h-10 flex items-center justify-center rounded-full bg-${note.noteColor}-700/80 hover:bg-${note.noteColor}-600  transition-transform transform hover:scale-110`}
              >
                {returnIcon}
              </button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default TrashNotes;
