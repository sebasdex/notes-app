"use client";
import { createContext, useState } from "react";

interface Note {
  id: string;
  text: string;
  noteColor: string;
}
interface NoteAppContext {
  textNotes: Note[];
  setTextNotes: React.Dispatch<React.SetStateAction<Note[]>>
}

export const NoteAppContext = createContext<NoteAppContext | undefined>(
  undefined
);

export const NoteAppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [textNotes, setTextNotes] = useState<Note[]>([]);

  return (
    <NoteAppContext.Provider value={{ textNotes, setTextNotes }}>
      {children}
    </NoteAppContext.Provider>
  );
};
