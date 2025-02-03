import { useNoteAppContext } from "@/context/useContextNoteApp";
import { useState } from "react";
interface Note {
  id: string;
  textNote: string;
  noteColor: string;
  isDone: boolean;
  date: string;
  hour: string;
}
interface NoteDataArray {
  id: string[];
  textNote: string[];
  noteColor: string[];
  isDone: boolean[];
  date: string[];
  hour: string[];
}

export const useNoteActions = () => {
  const { textNotes, setTextNotes, setNotesDeleted, setNotesArchived } =
    useNoteAppContext();
  const [isAlertDelete, setIsAlertDelete] = useState<boolean>(false);
  const [_, setIsConfirm] = useState<boolean>(false);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);
  const handleAvailable = (note: Note) => {
    setTextNotes((prevState) => {
      const noteProtected = prevState.map((txtNote) =>
        txtNote.id === note.id ? { ...note, isDone: !note.isDone } : txtNote
      );
      localStorage.setItem("textNotes", JSON.stringify(noteProtected));
      return noteProtected;
    });
    setIsConfirm(true);
  };

  const handleUnavailable = (note: Note) => {
    setTextNotes((prevState) => {
      const noteUnProtected = prevState.map((txtNote) =>
        txtNote.id === note.id ? { ...note, isDone: !note.isDone } : txtNote
      );
      localStorage.setItem("textNotes", JSON.stringify(noteUnProtected));
      return noteUnProtected;
    });
    setIsConfirm(false);
  };

  const handleDeleteConfirm = () => {
    if (noteToDelete) {
      const note = textNotes.find((note) => note.id === noteToDelete);
      if (note) {
        setNotesDeleted((prevState) => {
          const trashNotes = [...prevState, note];
          localStorage.setItem("notesDeleted", JSON.stringify(trashNotes));
          return trashNotes;
        });
        setTextNotes((prevState) => {
          const deleteNote = prevState.filter(
            (txtNote) => txtNote.id !== noteToDelete
          );
          localStorage.setItem("textNotes", JSON.stringify(deleteNote));
          return deleteNote;
        });
      }
      setNoteToDelete(null);
    }
    setIsAlertDelete(false);
  };

  const handleDelete = (id: string) => {
    setNoteToDelete(id);
    setIsAlertDelete(true);
  };

  const handleArchive = (note: Note) => {
    const noteID = textNotes.find((txtNote) => txtNote.id === note.id);
    if (noteID) {
      setNotesArchived((prevState) => {
        const archiveNotes = [...prevState, noteID];
        localStorage.setItem("notesArchived", JSON.stringify(archiveNotes));
        return archiveNotes;
      });
      setTextNotes((prevState) => {
        const archiveNote = prevState.filter(
          (txtNote) => txtNote.id !== note.id
        );
        localStorage.setItem("textNotes", JSON.stringify(archiveNote));
        return archiveNote;
      });
    }
  };

  const addNoteToDBFromLS = async () => {
    try {
      const notesLS: NoteDataArray = JSON.parse(
        localStorage.getItem("textNotes") || "[]"
      );
      if (!Array.isArray(notesLS) || notesLS.length === 0) {
        return;
      }
      const notesArr: NoteDataArray = notesLS.reduce(
        (acc: NoteDataArray, note: Note) => {
          acc.id.push(note.id);
          acc.noteColor.push(note.noteColor);
          acc.textNote.push(note.textNote);
          acc.isDone.push(note.isDone);
          acc.date.push(note.date);
          acc.hour.push(note.hour);
          return acc;
        },
        { id: [], noteColor: [], textNote: [], isDone: [], date: [], hour: [] }
      );
      const response = await fetch("/api/addNote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notesArr),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Error desconocido al insertar notas");
      }
      localStorage.removeItem("textNotes");
    } catch (error) {
      console.error("❌ Error al sincronizar notas:", error);
    }
  };
  return {
    handleUnavailable,
    handleAvailable,
    handleDelete,
    handleDeleteConfirm,
    isAlertDelete,
    setIsAlertDelete,
    noteToDelete,
    textNotes,
    setTextNotes,
    handleArchive,
    addNoteToDBFromLS,
  };
};
