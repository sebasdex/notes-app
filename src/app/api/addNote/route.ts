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
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user?.id) {
      return NextResponse.json(
        { error: "No estas autenticado" },
        { status: 401 }
      );
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
    await supabase.from("newNotes").insert(notesArray);
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
