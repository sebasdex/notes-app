import { useNoteAppContext } from "@/context/useContextNoteApp"
function Note() {
    const { textNotes, setTextNotes } = useNoteAppContext()
    return (
        <section className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-4">
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
                        className={`text-white text-lg placeholder-white/80 p-4 rounded-md w-full h-48 resize-none border-none outline-none ${note.noteColor}`}
                        onChange={(e) =>
                            setTextNotes(
                                textNotes.map((txtNote) =>
                                    txtNote.id === note.id
                                        ? { ...note, text: e.target.value }
                                        : txtNote
                                )
                            )
                        }
                        value={note.text}
                        autoFocus
                        placeholder="Escribe aquí tu nota"
                    ></textarea>
                    {/* Footer */}
                    <div className="flex justify-between items-center mt-4 px-2 py-2 rounded-lg bg-white/20 backdrop-blur-md">
                        {/* Confirm Icon */}
                        <button
                            tabIndex={-1}
                            onMouseDown={(e) => e.preventDefault()}
                            aria-label="Confirmar nota"
                            className={`w-10 h-10 flex items-center justify-center rounded-full bg-${note.noteColor}-700/80 hover:bg-${note.noteColor}-600  transition-transform transform hover:scale-110`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M20 6L9 17l-5-5" />
                            </svg>
                        </button>
                        {/* Edit Icon */}
                        <button
                            tabIndex={-1}
                            onMouseDown={(e) => e.preventDefault()}
                            aria-label="Editar nota"
                            className={`w-10 h-10 flex items-center justify-center rounded-full bg-${note.noteColor}-700/80 hover:bg-${note.noteColor}-600  transition-transform transform hover:scale-110`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                            </svg>
                        </button>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default Note