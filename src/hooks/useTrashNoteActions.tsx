import { useNoteAppContext } from "@/context/useContextNoteApp";
import { User } from "@supabase/supabase-js";
import { useState } from "react";
import { toast } from "sonner";

export const useTrashNoteActions = () => {
  const { setNotesDeleted, notesDeleted, searchText } = useNoteAppContext();
  const [isAlertDelete, setIsAlertDelete] = useState<boolean>(false);
  const [trashNotes, setTrashNotes] = useState<string | null>(null);

  const getTrashNotes = async (user: User) => {
    if (!user?.id) {
      return;
    }
    try {
      const response = await fetch("/api/getTrashNotes");
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Error desconocido en la API");
      }
      setNotesDeleted(result.trashNotes.length > 0 ? result.trashNotes : []);
    } catch (error) {
      console.log("❌ Error al cargar notas de la papelera:", error);
    }
  };

  const handleDelete = (id: string) => {
    setTrashNotes(id);
    setIsAlertDelete(true);
  };

  const handleDeleteConfirm = async (user: User) => {
    if (trashNotes) {
      const note = notesDeleted.find((note) => note.id === trashNotes);
      if (note) {
        const deletePromise = async () => {
          const response = await fetch("/api/deleteNotes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: note.id }),
          });
          const result = await response.json();
          if (!response.ok) {
            throw new Error(result.error || "Error al eliminar la nota");
          }
          setNotesDeleted((prev) =>
            prev.filter((txtNote) => txtNote.id !== note.id)
          );
          await getTrashNotes(user);
          return { name: "Nota eliminada" };
        };
        toast.promise(deletePromise, {
          loading: "Eliminando nota...",
          success: (data) => {
            return `${data.name} correctamente.`;
          },
          error: "Error",
        });
      }
      setTrashNotes(null);
    }
    setIsAlertDelete(false);
  };

  const handleReturn = async (id: string, user: User) => {
    const returnPromise = async () => {
      const response = await fetch("/api/updateNote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isDeleted: false }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Error al actualizar la nota");
      }
      await getTrashNotes(user);
      return { name: "Nota restaurada" };
    };
    toast.promise(returnPromise, {
      loading: "Restaurando nota...",
      success: (data) => {
        return `${data.name} correctamente.`;
      },
      error: "Error",
    });
  };

  const handleArchive = async (id: string, user: User) => {
    const archivePromise = async () => {
      const response = await fetch("/api/updateNote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isArchived: true, isDeleted: false }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Error al actualizar la nota");
      }
      await getTrashNotes(user);
      return { name: "Nota archivada" };
    };
    toast.promise(archivePromise, {
      loading: "Archivando nota...",
      success: (data) => {
        return `${data.name} correctamente.`;
      },
      error: "Error",
    });
  };

  return {
    handleDelete,
    handleDeleteConfirm,
    isAlertDelete,
    setIsAlertDelete,
    trashNotes,
    setNotesDeleted,
    notesDeleted,
    getTrashNotes,
    handleReturn,
    handleArchive,
    searchText,
  };
};
