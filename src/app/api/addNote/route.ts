import { NextResponse } from "next/server";
import { createClient } from "@/config/supabaseServer";

interface NoteDataArray {
  id: string[];
  textNote: string[];
  noteColor: string[];
  isProtected: boolean[];
  isArchived: boolean[];
  isDeleted: boolean[];
  date: string[];
  hour: string[];
  user_id: string;
}

export async function POST(req: Request) {
  try {
    const dataClient: NoteDataArray = await req.json();
    const supabase = await createClient();
    const { data, error: authError } = await supabase.auth.getUser();
    if (authError || !data?.user?.id) {
      return NextResponse.json({ error: authError?.message }, { status: 401 });
    }
    const userID = data.user.id;
    const notesArray = dataClient.id.map((_, i) => ({
      id: dataClient.id[i],
      textNote: dataClient.textNote[i],
      noteColor: dataClient.noteColor[i],
      isProtected: dataClient.isProtected[i],
      isArchived: dataClient.isArchived[i],
      isDeleted: dataClient.isDeleted[i],
      date: dataClient.date[i],
      hour: dataClient.hour[i],
      user_id: userID,
    }));
    const { error: insertError } = await supabase
      .from("newNotes")
      .insert(notesArray);
    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "Datos insertados correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error al sincronizar notas:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
