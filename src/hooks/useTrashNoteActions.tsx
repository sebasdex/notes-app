import { useNoteAppContext } from "@/context/useContextNoteApp";
import { User } from "@supabase/supabase-js";
import { useState } from "react";

export const useTrashNoteActions = () => {
  const { setNotesDeleted, notesDeleted } = useNoteAppContext();
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
        try {
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
          console.log("✅ Nota eliminada correctamente de la BD.");
          await getTrashNotes(user);
        } catch (error) {
          console.log("❌ Error al eliminar nota de la BD:", error);
        }
      }
      setTrashNotes(null);
    }
    setIsAlertDelete(false);
  };

  const handleReturn = async (id: string, user: User) => {
    try {
      const response = await fetch("/api/updateNote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isDeleted: false }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Error al actualizar la nota");
      }
      console.log("✅ Nota devuelta correctamente en la BD.");
      await getTrashNotes(user);
    } catch (error) {
      console.log("❌ Error al devolver nota de la papelera:", error);
    }
  };

  const handleArchive = async (id: string, user: User) => {
    try {
      const response = await fetch("/api/updateNote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isArchived: true, isDeleted: false }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Error al actualizar la nota");
      }
      console.log("✅ Nota archivada correctamente en la BD.");
      await getTrashNotes(user);
    } catch (error) {
      console.log("❌ Error al archivar nota de la papelera:", error);
    }
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
  };
};
