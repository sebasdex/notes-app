import { useContext } from "react";
import { NoteAppContext } from "./ContextNoteApp";
export const useNoteAppContext = () => {
  const context = useContext(NoteAppContext);
  if (!context) {
    throw new Error("useNoteAppContext must be used within a NoteAppProvider");
  }
  return context;
};
