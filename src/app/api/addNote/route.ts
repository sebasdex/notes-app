import { NextResponse } from "next/server";
import { createClient } from "@/config/supabaseServer";

export async function POST(req: Request) {
  try {
    const dataClient = await req.json();
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user?.id) {
      return NextResponse.json(
        { error: "No estas autenticado" },
        { status: 401 }
      );
    }
    const userID = data.user.id;
    const noteData = {
      id: dataClient.id,
      textNote: dataClient.text,
      noteColor: dataClient.noteColor,
      isDone: dataClient.isDone,
      date: dataClient.date,
      hour: dataClient.hour,
      user_id: userID,
    };
    const { error: insertNoteError } = await supabase
      .from("newNotes")
      .insert([noteData]);
    if (insertNoteError) {
      return NextResponse.json({ error: insertNoteError }, { status: 500 });
    }
    return NextResponse.json(
      { message: "Datos insertados correctamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
