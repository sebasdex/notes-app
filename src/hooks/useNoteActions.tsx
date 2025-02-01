import { useNoteAppContext } from "@/context/useContextNoteApp";
import { useState } from "react";
interface Note {
  id: string;
  text: string;
  noteColor: string;
  isDone: boolean;
  date: string;
  hour: string;
}

export const useNoteActions = () => {
  const { textNotes, setTextNotes, setNotesDeleted } = useNoteAppContext();
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
  };
};
