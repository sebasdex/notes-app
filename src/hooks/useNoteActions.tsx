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
  const hourIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-timer"
    >
      <line x1="10" x2="14" y1="2" y2="2" />
      <line x1="12" x2="15" y1="14" y2="11" />
      <circle cx="12" cy="14" r="8" />
    </svg>
  );
  const dateIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-calendar"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
  const protectIcon = (
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
  );
  const unProtectedIcon = (
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
  );
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
    deleteIcon,
    protectIcon,
    unProtectedIcon,
    dateIcon,
    hourIcon,
  };
};
