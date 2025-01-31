"use client";
import { useEffect } from "react";
import ModalConfirm from "@/components/ModalConfirm";
import { useNoteActions } from "@/hooks/useNoteActions";

function Note() {
  const {
    textNotes,
    setTextNotes,
    isAlertDelete,
    setIsAlertDelete,
    handleDeleteConfirm,
    handleDelete,
    handleAvailable,
    handleUnavailable,
    deleteIcon,
    unProtectedIcon,
    protectIcon,
    dateIcon,
    hourIcon,
  } = useNoteActions();
  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem("textNotes") || "[]");
    if (notes.length > 0) {
      setTextNotes(notes);
    }
  }, []);
  return (
    <>
      <ModalConfirm
        isAlertDelete={isAlertDelete}
        setIsAlertDelete={setIsAlertDelete}
        onConfirm={handleDeleteConfirm}
        message="¿Estás seguro de eliminar esta nota?"
      />
      <section className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-4">
        {textNotes.map((note, index) => (
          <div
            key={note.id}
            className={`relative p-4 focus-within:ring-2 focus-within:ring-black rounded-lg w-full transform opacity-0 translate-y-10 animate-slide-in ${note.noteColor}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex justify-between px-2 py-2 rounded-lg text-white/60 text-sm font-semibold">
              <div className="flex items-center gap-2">
                <span>{dateIcon}</span>
                <span>{note.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{hourIcon}</span>
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
              onChange={(e) =>
                setTextNotes((prev) => {
                  const noteChanged = prev.map((txtNote) =>
                    txtNote.id === note.id
                      ? { ...note, text: e.target.value }
                      : txtNote
                  );
                  localStorage.setItem(
                    "textNotes",
                    JSON.stringify(noteChanged)
                  );
                  return noteChanged;
                })
              }
              value={note.text}
              autoFocus
              disabled={note.isDone}
              placeholder="Escribe aquí..."
            ></textarea>
            {/* Footer */}
            <div className="flex justify-between mt-4 px-2 py-2 rounded-lg bg-white/20 backdrop-blur-md">
              {/* Delete Button */}
              <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleDelete(note.id)}
                aria-label="delete note"
                className={`w-10 h-10 flex items-center justify-center rounded-full bg-${note.noteColor}-700/80 hover:bg-${note.noteColor}-600  transition-transform transform hover:scale-110`}
              >
                {deleteIcon}
              </button>
              {/* Unprotected Button */}
              {note.isDone ? (
                <button
                  onClick={() => handleUnavailable(note)}
                  onMouseDown={(e) => e.preventDefault()}
                  aria-label="protect-note"
                  className={`w-10 h-10 flex items-center justify-center rounded-full bg-${note.noteColor}-700/80 hover:bg-${note.noteColor}-600  transition-transform transform hover:scale-110`}
                >
                  {unProtectedIcon}
                </button>
              ) : (
                // protect button
                <button
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleAvailable(note)}
                  aria-label="Confirmar nota"
                  className={`w-10 h-10 flex items-center justify-center rounded-full bg-${note.noteColor}-700/80 hover:bg-${note.noteColor}-600  transition-transform transform hover:scale-110`}
                >
                  {protectIcon}
                </button>
              )}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default Note;
