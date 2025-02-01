import { useNoteAppContext } from "@/context/useContextNoteApp";
import { useState } from "react";

export const useTrashNoteActions = () => {
  const { setNotesDeleted, notesDeleted } = useNoteAppContext();
  const [isAlertDelete, setIsAlertDelete] = useState<boolean>(false);
  const [trashNotes, setTrashNotes] = useState<string | null>(null);
  const handleDelete = (id: string) => {
    setTrashNotes(id);
    setIsAlertDelete(true);
  };

  const handleDeleteConfirm = () => {
    if (trashNotes) {
      const note = notesDeleted.find((note) => note.id === trashNotes);
      if (note) {
        setNotesDeleted((prevState) => {
          const deleteTrashNotes = prevState.filter(
            (txtNote) => txtNote.id !== trashNotes
          );
          localStorage.setItem(
            "notesDeleted",
            JSON.stringify(deleteTrashNotes)
          );
          return deleteTrashNotes;
        });
      }
      setTrashNotes(null);
    }
    setIsAlertDelete(false);
  };
  return {
    handleDelete,
    handleDeleteConfirm,
    isAlertDelete,
    setIsAlertDelete,
    trashNotes,
    setNotesDeleted,
    notesDeleted,
  };
};
