"use client";
import { useNoteAppContext } from "@/context/useContextNoteApp";
import { useState } from "react";
import ModalConfirm from "@/components/ModalConfirm";
interface Note {
  id: string;
  text: string;
  noteColor: string;
  isDone: boolean;
}
function Note() {
  const { textNotes, setTextNotes, setNotesDeleted } = useNoteAppContext();
  const [_, setIsConfirm] = useState<boolean>(false);
  const [isAlertDelete, setIsAlertDelete] = useState<boolean>(false);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);

  const handleAvailable = (note: Note) => {
    setTextNotes((prevState) =>
      prevState.map((txtNote) =>
        txtNote.id === note.id ? { ...note, isDone: !note.isDone } : txtNote
      )
    );
    setIsConfirm(true);
  };

  const handleUnavailable = (note: Note) => {
    setTextNotes((prevState) =>
      prevState.map((txtNote) =>
        txtNote.id === note.id ? { ...note, isDone: !note.isDone } : txtNote
      )
    );
    setIsConfirm(false);
  };

  const handleDeleteConfirm = () => {
    if (noteToDelete) {
      const note = textNotes.find((note) => note.id === noteToDelete);
      if (note) {
        setNotesDeleted((prevState) => [...prevState, note]);
        setTextNotes((prevState) =>
          prevState.filter((txtNote) => txtNote.id !== noteToDelete)
        );
      }
      setNoteToDelete(null);
    }
    setIsAlertDelete(false);
  };

  const handleDelete = (id: string) => {
    setNoteToDelete(id);
    setIsAlertDelete(true);
  };
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
            {/* Textarea */}
            <textarea
              name="note"
              id={`note-${note.id}`}
              className={`text-white text-lg placeholder-white/80 p-4
                 rounded-md w-full h-48 resize-none border-none outline-none ${note.noteColor} disabled:cursor-not-allowed`}
              onChange={(e) =>
                setTextNotes(
                  textNotes.map((txtNote) =>
                    txtNote.id === note.id
                      ? {
                          ...note,
                          text: e.target.value,
                        }
                      : txtNote
                  )
                )
              }
              value={note.text}
              autoFocus
              disabled={note.isDone}
              placeholder="Escribe aquí..."
            ></textarea>
            {/* Footer */}
            <div className="flex justify-between mt-4 px-2 py-2 rounded-lg bg-white/20 backdrop-blur-md">
              {/* Delete Icon */}
              <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleDelete(note.id)}
                aria-label="delete note"
                className={`w-10 h-10 flex items-center justify-center rounded-full bg-${note.noteColor}-700/80 hover:bg-${note.noteColor}-600  transition-transform transform hover:scale-110`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
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
              </button>
              {/* Edit Icon */}
              {note.isDone ? (
                <button
                  onClick={() => handleUnavailable(note)}
                  onMouseDown={(e) => e.preventDefault()}
                  aria-label="Editar nota"
                  className={`w-10 h-10 flex items-center justify-center rounded-full bg-${note.noteColor}-700/80 hover:bg-${note.noteColor}-600  transition-transform transform hover:scale-110`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-shield-off"
                  >
                    <path d="m2 2 20 20" />
                    <path d="M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71" />
                    <path d="M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264" />
                  </svg>
                </button>
              ) : (
                <button
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleAvailable(note)}
                  aria-label="Confirmar nota"
                  className={`w-10 h-10 flex items-center justify-center rounded-full bg-${note.noteColor}-700/80 hover:bg-${note.noteColor}-600  transition-transform transform hover:scale-110`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-shield"
                  >
                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                  </svg>
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
