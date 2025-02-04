import { useNoteAppContext } from "@/context/useContextNoteApp";
import { useState } from "react";
import { createClient } from "@/config/supabaseClient";
interface Note {
  id: string;
  textNote: string;
  noteColor: string;
  isDone: boolean;
  date: string;
  hour: string;
}
interface NoteDataArray {
  id: string[];
  textNote: string[];
  noteColor: string[];
  isDone: boolean[];
  date: string[];
  hour: string[];
}

export const useNoteActions = () => {
  const { textNotes, setTextNotes, setNotesDeleted, setNotesArchived } =
    useNoteAppContext();
  const [isAlertDelete, setIsAlertDelete] = useState<boolean>(false);
  const [_, setIsConfirm] = useState<boolean>(false);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);
  const supabase = createClient();

  const handleAvailable = async (note: Note) => {
    // 📌 Verificar si el usuario está autenticado
    const { data } = await supabase.auth.getUser();
    const userId = data?.user?.id;

    // 📌 Si el usuario NO está autenticado, guardar solo en `localStorage`
    if (!userId) {
      console.warn(
        "⚠️ Usuario no autenticado. La nota solo se guardará en localStorage."
      );

      const updatedNotes = textNotes.map((txtNote) =>
        txtNote.id === note.id ? { ...note, isDone: true } : txtNote
      );

      setTextNotes(updatedNotes);
      localStorage.setItem("textNotes", JSON.stringify(updatedNotes));
      setIsConfirm(true);
      return;
    }

    // 📌 Si el usuario SÍ está autenticado, actualizar solo en la BD
    try {
      const response = await fetch("/api/updateNote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: note.id, isDone: true }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error al actualizar la nota");
      }

      // 📌 Actualizar el estado solo después de que la BD confirme el cambio
      const updatedNotes = textNotes.map((txtNote) =>
        txtNote.id === note.id ? { ...note, isDone: true } : txtNote
      );

      setTextNotes(updatedNotes);
      setIsConfirm(true);
      console.log("✅ Nota protegida correctamente en la BD.");
    } catch (error) {
      console.error("❌ Error al actualizar la nota en la BD:", error);
    }
  };

  const handleUnavailable = async (note: Note) => {
    // 📌 Verificar si el usuario está autenticado
    const { data } = await supabase.auth.getUser();
    const userId = data?.user?.id;

    // 📌 Si el usuario NO está autenticado, guardar solo en `localStorage`
    if (!userId) {
      console.warn(
        "⚠️ Usuario no autenticado. La nota solo se guardará en localStorage."
      );

      const updatedNotes = textNotes.map((txtNote) =>
        txtNote.id === note.id ? { ...note, isDone: false } : txtNote
      );

      setTextNotes(updatedNotes);
      localStorage.setItem("textNotes", JSON.stringify(updatedNotes));
      setIsConfirm(false);
      return;
    }

    // 📌 Si el usuario SÍ está autenticado, actualizar solo en la BD
    try {
      const response = await fetch("/api/updateNote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: note.id, isDone: false }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error al actualizar la nota");
      }

      // 📌 Actualizar el estado solo después de que la BD confirme el cambio
      const updatedNotes = textNotes.map((txtNote) =>
        txtNote.id === note.id ? { ...note, isDone: false } : txtNote
      );

      setTextNotes(updatedNotes);
      setIsConfirm(false);
      console.log("✅ Nota desprotegida correctamente en la BD.");
    } catch (error) {
      console.error("❌ Error al actualizar la nota en la BD:", error);
    }
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

  const handleArchive = (note: Note) => {
    const noteID = textNotes.find((txtNote) => txtNote.id === note.id);
    if (noteID) {
      setNotesArchived((prevState) => {
        const archiveNotes = [...prevState, noteID];
        localStorage.setItem("notesArchived", JSON.stringify(archiveNotes));
        return archiveNotes;
      });
      setTextNotes((prevState) => {
        const archiveNote = prevState.filter(
          (txtNote) => txtNote.id !== note.id
        );
        localStorage.setItem("textNotes", JSON.stringify(archiveNote));
        return archiveNote;
      });
    }
  };

  const addNoteToDBFromLS = async () => {
    try {
      const notesLS: NoteDataArray = JSON.parse(
        localStorage.getItem("textNotes") || "[]"
      );
      if (!Array.isArray(notesLS) || notesLS.length === 0) {
        return;
      }
      const notesArr: NoteDataArray = notesLS.reduce(
        (acc: NoteDataArray, note: Note) => {
          acc.id.push(note.id);
          acc.noteColor.push(note.noteColor);
          acc.textNote.push(note.textNote);
          acc.isDone.push(note.isDone);
          acc.date.push(note.date);
          acc.hour.push(note.hour);
          return acc;
        },
        { id: [], noteColor: [], textNote: [], isDone: [], date: [], hour: [] }
      );
      const response = await fetch("/api/addNote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notesArr),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Error desconocido al insertar notas");
      }
      localStorage.removeItem("textNotes");
    } catch (error) {
      console.error("❌ Error al sincronizar notas:", error);
    }
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
    handleArchive,
    addNoteToDBFromLS,
  };
};
