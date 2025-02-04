import { NextResponse } from "next/server";
import { createClient } from "@/config/supabaseServer";

interface Note {
  id: string;
  textNote: string;
  isDone: boolean;
}

export async function POST(req: Request) {
  try {
    const { id, textNote, isDone } = await req.json();

    if (!id || (textNote === undefined && isDone === undefined)) {
      return NextResponse.json(
        { error: "Faltan datos: id y al menos un campo a actualizar" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const updateData: Partial<Note> = {};

    if (textNote !== undefined) updateData.textNote = textNote;
    if (isDone !== undefined) updateData.isDone = isDone;

    const { data, error } = await supabase
      .from("newNotes")
      .update(updateData)
      .eq("id", id);

    if (error) {
      throw error;
    }

    return NextResponse.json(
      { message: "Nota actualizada correctamente", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error en la API de actualización:", error);
    return NextResponse.json(
      { error: "Error al actualizar la nota" },
      { status: 500 }
    );
  }
}
