import { useNoteAppContext } from "@/context/useContextNoteApp";
import { useState } from "react";
import { createClient } from "@/config/supabaseClient";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";
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
  const { textNotes, setTextNotes, setAllNotes, allNotes } =
    useNoteAppContext();
  const [isAlertDelete, setIsAlertDelete] = useState<boolean>(false);
  const [_, setIsConfirm] = useState<boolean>(false);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);
  const supabase = createClient();

  const loadNotes = async (user: User) => {
    if (!user?.id) {
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
    } catch (error) {
      console.error("❌ Error al cargar notas desde API:", error);
    }
  };

  const handleAvailable = async (note: Note) => {
    const { data } = await supabase.auth.getUser();
    const userId = data?.user?.id;
    if (!userId) {
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
    } catch (error) {
      console.error("❌ Error al actualizar la nota en la BD:", error);
    }
  };

  const handleUnavailable = async (note: Note) => {
    const { data } = await supabase.auth.getUser();
    const userId = data?.user?.id;
    if (!userId) {
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
    } catch (error) {
      console.error("❌ Error al actualizar la nota en la BD:", error);
    }
  };

  const handleDeleteConfirm = async (user: User) => {
    if (noteToDelete) {
      const note = textNotes.find((note) => note.id === noteToDelete);
      if (note) {
        const { data } = await supabase.auth.getUser();
        const userId = data?.user?.id;

        if (!userId) {
          setTextNotes((prev) => {
            const updatedNotes = prev.map((txtNote) =>
              txtNote.id === note.id ? { ...txtNote, isDeleted: true } : txtNote
            );
            localStorage.setItem("textNotes", JSON.stringify(updatedNotes));
            return updatedNotes;
          });
          return;
        }
        const deletePromise = async () => {
          const response = await fetch("/api/updateNote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: note.id, isDeleted: true }),
          });

          const result = await response.json();
          const isDeleted = result.data.isDeleted ?? result.data;

          setTextNotes((prev) => {
            const updatedNotes = prev.map((txtNote) =>
              txtNote.id === note.id ? { ...txtNote, isDeleted } : txtNote
            );
            return updatedNotes;
          });

          if (!response.ok) {
            throw new Error(result.error || "Error al actualizar la nota");
          }
          return { name: "Nota eliminada" };
        };
        toast.promise(deletePromise(), {
          loading: "Eliminando nota...",
          success: (data) => `${data.name} correctamente.`,
          error: "Error al eliminar la nota.",
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

    if (!userId) {
      setTextNotes((prev) => {
        const updatedNotes = prev.map((txtNote) =>
          txtNote.id === note.id ? { ...txtNote, isArchived: true } : txtNote
        );
        localStorage.setItem("textNotes", JSON.stringify(updatedNotes));
        return updatedNotes;
      });

      toast.info("Nota archivada localmente.");
      return;
    }

    const archivePromise = async () => {
      const response = await fetch("/api/updateNote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: note.id, isArchived: true }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Error al archivar la nota");
      setTextNotes((prev) =>
        prev.map((txtNote) =>
          txtNote.id === note.id ? { ...txtNote, isArchived: true } : txtNote
        )
      );
      await loadNotes(user);
      return { name: "Nota archivada" };
    };
    toast.promise(archivePromise(), {
      loading: "Archivando nota...",
      success: (data) => `${data.name} correctamente.`,
      error: "Error al archivar la nota.",
    });
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
    setAllNotes,
    allNotes,
  };
};
