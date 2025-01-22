"use client";
import { createContext, useState } from "react";

interface NoteAppContext {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NoteAppContext = createContext<NoteAppContext | undefined>(
  undefined
);

export const NoteAppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <NoteAppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </NoteAppContext.Provider>
  );
};
