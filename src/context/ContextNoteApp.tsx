"use client";
import { createContext, useState } from "react";

interface Note {
  id: string;
  text: string;
  noteColor: string;
  isDone: boolean;
  date: string;
  hour: string;
}
interface NoteAppContext {
  textNotes: Note[];
  setTextNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  notesDeleted: Note[];
  setNotesDeleted: React.Dispatch<React.SetStateAction<Note[]>>;
  notesArchived: Note[];
  setNotesArchived: React.Dispatch<React.SetStateAction<Note[]>>;
}

export const NoteAppContext = createContext<NoteAppContext | undefined>(
  undefined
);

export const NoteAppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [textNotes, setTextNotes] = useState<Note[]>([]);
  const [notesDeleted, setNotesDeleted] = useState<Note[]>([]);
  const [notesArchived, setNotesArchived] = useState<Note[]>([]);

  return (
    <NoteAppContext.Provider
      value={{
        textNotes,
        setTextNotes,
        notesDeleted,
        setNotesDeleted,
        notesArchived,
        setNotesArchived,
      }}
    >
      {children}
    </NoteAppContext.Provider>
  );
};
