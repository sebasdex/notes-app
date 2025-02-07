"use client";
import { createContext, useState } from "react";

interface Note {
  id: string;
  textNote: string;
  noteColor: string;
  isProtected: boolean;
  isArchived: boolean;
  isDeleted: boolean;
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
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
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
  const [searchText, setSearchText] = useState<string>("");

  return (
    <NoteAppContext.Provider
      value={{
        textNotes,
        setTextNotes,
        notesDeleted,
        setNotesDeleted,
        notesArchived,
        setNotesArchived,
        searchText,
        setSearchText,
      }}
    >
      {children}
    </NoteAppContext.Provider>
  );
};
