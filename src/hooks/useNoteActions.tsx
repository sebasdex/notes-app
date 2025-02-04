import { useNoteAppContext } from "@/context/useContextNoteApp";
import { useState } from "react";
import { createClient } from "@/config/supabaseClient";
import { User } from "@supabase/supabase-js";
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
interface NoteDataArray {
  id: string[];
  textNote: string[];
  noteColor: string[];
  isProtected: boolean[];
  isArchived: boolean[];
  isDeleted: boolean[];
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

  const loadNotes = async (user: User) => {
    if (!user?.id) {
      console.warn(
        "⚠️ Usuario no autenticado. Mostrando solo notas de localStorage."
      );
      const notes = JSON.parse(localStorage.getItem("textNotes") || "[]");
      setTextNotes(notes);
      return;
    }
    await addNoteToDBFromLS();
    try {
      const response = await fetch("/api/getNotes");
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Error desconocido en la API");
      }
      setTextNotes(result.notes.length > 0 ? result.notes : []);
      console.log("✅ Notas sincronizadas y cargadas desde la API.");
    } catch (error) {
      console.error("❌ Error al cargar notas desde API:", error);
    }
  };

  const handleAvailable = async (note: Note) => {
    const { data } = await supabase.auth.getUser();
    const userId = data?.user?.id;
    if (!userId) {
      console.warn(
        "⚠️ Usuario no autenticado. La nota solo se guardará en localStorage."
      );

      const updatedNotes = textNotes.map((txtNote) =>
        txtNote.id === note.id ? { ...note, isProtected: true } : txtNote
      );

      setTextNotes(updatedNotes);
      localStorage.setItem("textNotes", JSON.stringify(updatedNotes));
      setIsConfirm(true);
      return;
    }
    try {
      const response = await fetch("/api/updateNote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: note.id, isProtected: true }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error al actualizar la nota");
      }

      const updatedNotes = textNotes.map((txtNote) =>
        txtNote.id === note.id ? { ...note, isProtected: true } : txtNote
      );

      setTextNotes(updatedNotes);
      setIsConfirm(true);
      console.log("✅ Nota protegida correctamente en la BD.");
    } catch (error) {
      console.error("❌ Error al actualizar la nota en la BD:", error);
    }
  };

  const handleUnavailable = async (note: Note) => {
    const { data } = await supabase.auth.getUser();
    const userId = data?.user?.id;

    if (!userId) {
      console.warn(
        "⚠️ Usuario no autenticado. La nota solo se guardará en localStorage."
      );

      const updatedNotes = textNotes.map((txtNote) =>
        txtNote.id === note.id ? { ...note, isProtected: false } : txtNote
      );

      setTextNotes(updatedNotes);
      localStorage.setItem("textNotes", JSON.stringify(updatedNotes));
      setIsConfirm(false);
      return;
    }

    try {
      const response = await fetch("/api/updateNote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: note.id, isProtected: false }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error al actualizar la nota");
      }

      const updatedNotes = textNotes.map((txtNote) =>
        txtNote.id === note.id ? { ...note, isProtected: false } : txtNote
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

  const handleArchive = async (note: Note, user: User) => {
    const { data } = await supabase.auth.getUser();
    const userId = data?.user?.id;

    // 📌 Si el usuario NO está autenticado, guardar solo en `localStorage`
    if (!userId) {
      console.warn(
        "⚠️ Usuario no autenticado. La nota solo se guardará en localStorage."
      );

      setTextNotes((prev) => {
        const updatedNotes = prev.map((txtNote) =>
          txtNote.id === note.id ? { ...txtNote, isArchived: true } : txtNote
        );
        localStorage.setItem("textNotes", JSON.stringify(updatedNotes));
        return updatedNotes;
      });
      return;
    }
    try {
      // 📌 Actualizar la nota en la BD
      const response = await fetch("/api/updateNote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: note.id, isArchived: true }),
      });

      const result = await response.json();
      setTextNotes((prev) =>
        prev.map((txtNote) =>
          txtNote.id === note.id
            ? { ...txtNote, isArchived: result.data }
            : txtNote
        )
      );
      if (!response.ok) {
        throw new Error(result.error || "Error al actualizar la nota");
      }
      await loadNotes(user);
      console.log("✅ Nota archivada correctamente en la BD.");
    } catch (error) {
      console.error("❌ Error al actualizar la nota en la BD:", error);
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
          acc.isProtected.push(note.isProtected);
          acc.isArchived.push(note.isArchived);
          acc.isDeleted.push(note.isDeleted);
          acc.date.push(note.date);
          acc.hour.push(note.hour);
          return acc;
        },
        {
          id: [],
          noteColor: [],
          textNote: [],
          isProtected: [],
          isArchived: [],
          isDeleted: [],
          date: [],
          hour: [],
        }
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
    loadNotes,
  };
};
