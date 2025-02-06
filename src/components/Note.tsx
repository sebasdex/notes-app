import { useEffect } from "react";
import ModalConfirm from "@/components/ModalConfirm";
import { useNoteActions } from "@/hooks/useNoteActions";
import TrashIcon from "@/icons/TrashIcon";
import DateIcon from "@/icons/DateIcon";
import TimeIcon from "@/icons/TimeIcon";
import ProtectIcon from "@/icons/ProtectIcon";
import UnProtectedIcon from "@/icons/UnProtectedIcon";
import ArchiveIcon from "@/icons/ArchiveIcon";
import { User } from "@supabase/supabase-js";

function Note({ user }: { user: User | null }) {
  const {
    textNotes,
    setTextNotes,
    isAlertDelete,
    setIsAlertDelete,
    handleDeleteConfirm,
    handleDelete,
    handleAvailable,
    handleUnavailable,
    handleArchive,
    loadNotes,
  } = useNoteActions();

  useEffect(() => {
    loadNotes(user as User);
  }, [user]);

  const updateNoteInDB = async (id: string, newText: string) => {
    setTimeout(async () => {
      try {
        const response = await fetch("/api/updateNote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, textNote: newText }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Error desconocido en la API");
        }
        //TODO: agregar mensaje de exito
      } catch (error) {
        console.error("❌ Error al actualizar nota en la BD:", error);
      }
    }, 2000);
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
        {textNotes
          .filter((note) => !note.isDeleted)
          .map((note, index) => (
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
                onChange={async (e) => {
                  const newText = e.target.value;
                  setTextNotes((prev) =>
                    prev.map((txtNote) =>
                      txtNote.id === note.id
                        ? { ...note, textNote: newText }
                        : txtNote
                    )
                  );

                  if (!user?.id) {
                    const updatedNotes = textNotes.map((txtNote) =>
                      txtNote.id === note.id
                        ? { ...note, textNote: newText }
                        : txtNote
                    );

                    localStorage.setItem(
                      "textNotes",
                      JSON.stringify(updatedNotes)
                    );
                    return;
                  }
                  updateNoteInDB(note.id, newText);
                }}
                value={note.textNote}
                autoFocus
                disabled={note.isProtected}
                placeholder="Escribe aquí..."
              ></textarea>

              {/* Footer */}
              <div className="flex justify-between mt-4 px-2 py-2 rounded-lg bg-white/20 backdrop-blur-md">
                {/* Delete Button */}
                <button
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleDelete(note.id)}
                  disabled={user?.id ? false : true}
                  aria-label="delete note"
                  className={`w-10 h-10 flex items-center justify-center rounded-full bg-${
                    note.noteColor
                  }-700/80 hover:bg-${
                    note.noteColor
                  }-600  transition-transform transform hover:scale-110 ${
                    user?.id ? "" : "cursor-not-allowed hover:scale-100"
                  }`}
                >
                  <TrashIcon
                    width={24}
                    height={24}
                    stroke={user?.id ? "white" : "rgba(255, 255, 255, 0.264)"}
                    strokeWidth={2}
                  />
                </button>
                {/* Archive Button */}
                <button
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleArchive(note, user as User)}
                  disabled={user?.id ? false : true}
                  aria-label="archive note"
                  className={`w-10 h-10 flex items-center justify-center rounded-full bg-${
                    note.noteColor
                  }-700/80 hover:bg-${
                    note.noteColor
                  }-600  transition-transform transform hover:scale-110 ${
                    user?.id ? "" : "cursor-not-allowed hover:scale-100"
                  }`}
                >
                  <ArchiveIcon
                    stroke={user?.id ? "white" : "rgba(255, 255, 255, 0.264)"}
                  />
                </button>
                {/* Unprotected Button */}
                {note.isProtected ? (
                  <button
                    onClick={() => handleUnavailable(note)}
                    onMouseDown={(e) => e.preventDefault()}
                    aria-label="protect-note"
                    className={`w-10 h-10 flex items-center justify-center rounded-full bg-${note.noteColor}-700/80 hover:bg-${note.noteColor}-600  transition-transform transform hover:scale-110`}
                  >
                    <UnProtectedIcon />
                  </button>
                ) : (
                  // protect button
                  <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleAvailable(note)}
                    aria-label="Confirmar nota"
                    className={`w-10 h-10 flex items-center justify-center rounded-full bg-${note.noteColor}-700/80 hover:bg-${note.noteColor}-600  transition-transform transform hover:scale-110`}
                  >
                    <ProtectIcon />
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
