import { useNoteAppContext } from "@/context/useContextNoteApp";
import { useState } from "react";

export const useTrashNoteActions = () => {
  const deleteIcon = (
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
  );
  const returnIcon = (
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
      className="lucide lucide-undo-2"
    >
      <path d="M9 14 4 9l5-5" />
      <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" />
    </svg>
  );
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
    deleteIcon,
    returnIcon,
    handleDelete,
    handleDeleteConfirm,
    isAlertDelete,
    setIsAlertDelete,
    trashNotes,
    setNotesDeleted,
    notesDeleted,
  };
};
