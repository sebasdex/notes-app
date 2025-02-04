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
    const addNote = {
      id: dataClient.id,
      textNote: dataClient.text,
      noteColor: dataClient.noteColor,
      isDone: dataClient.isDone,
      isArchived: dataClient.isArchived,
      isDeleted: dataClient.isDeleted,
      date: dataClient.date,
      hour: dataClient.hour,
      user_id: data.user.id,
    };
    await supabase.from("newNotes").insert([addNote]);
    if (error) {
      return NextResponse.json({ error }, { status: 500 });
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
