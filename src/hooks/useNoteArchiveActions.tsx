import { useNoteAppContext } from "@/context/useContextNoteApp";
import { useState } from "react";
import { toast } from "sonner";

export const useNoteArchiveActions = () => {
  const { notesArchived, setNotesArchived, setNotesDeleted } =
    useNoteAppContext();
  const [isAlertDelete, setIsAlertDelete] = useState<boolean>(false);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);

  const handleDeleteConfirm = async () => {
    if (noteToDelete) {
      const note = notesArchived.find((note) => note.id === noteToDelete);
      if (note) {
        const deletePromise = async () => {
          const response = await fetch("/api/updateNote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: note.id,
              isDeleted: true,
              isArchived: false,
            }),
          });
          const result = await response.json();
          if (!response.ok) {
            throw new Error(result.error || "Error al actualizar la nota");
          }
          await getNotes();
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
      setNoteToDelete(null);
    }
    setIsAlertDelete(false);
  };

  const handleDelete = (id: string) => {
    setNoteToDelete(id);
    setIsAlertDelete(true);
  };

  const getNotes = async () => {
    try {
      const response = await fetch("/api/getArchivedNotes");
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Error desconocido en la API");
      }
      setNotesArchived(
        result.archivedNotes.length > 0 ? result.archivedNotes : []
      );
    } catch (error) {
      console.log("❌ Error al cargar notas de archivo:", error);
    }
  };

  const handleReturn = async (id: string) => {
    const returnPromise = async () => {
      const response = await fetch("/api/updateNote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isArchived: false }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Error al actualizar la nota");
      }
      await getNotes();
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
  return {
    noteToDelete,
    setNoteToDelete,
    notesArchived,
    setNotesArchived,
    setNotesDeleted,
    isAlertDelete,
    setIsAlertDelete,
    handleDelete,
    handleDeleteConfirm,
    getNotes,
    handleReturn,
  };
};
