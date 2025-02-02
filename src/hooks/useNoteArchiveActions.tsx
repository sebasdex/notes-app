import { useNoteAppContext } from "@/context/useContextNoteApp";
import { useState } from "react";

export const useNoteArchiveActions = () => {
  const { notesArchived, setNotesArchived, setNotesDeleted } =
    useNoteAppContext();
  const [isAlertDelete, setIsAlertDelete] = useState<boolean>(false);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);
  const handleDeleteConfirm = () => {
    if (noteToDelete) {
      const note = notesArchived.find((note) => note.id === noteToDelete);
      if (note) {
        setNotesDeleted((prevState) => {
          const trashNotes = [...prevState, note];
          localStorage.setItem("notesDeleted", JSON.stringify(trashNotes));
          return trashNotes;
        });
        setNotesArchived((prevState) => {
          const deleteNote = prevState.filter(
            (txtNote) => txtNote.id !== noteToDelete
          );
          localStorage.setItem("notesArchived", JSON.stringify(deleteNote));
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
    noteToDelete,
    setNoteToDelete,
    notesArchived,
    setNotesArchived,
    setNotesDeleted,
    isAlertDelete,
    setIsAlertDelete,
    handleDelete,
    handleDeleteConfirm,
  };
};
