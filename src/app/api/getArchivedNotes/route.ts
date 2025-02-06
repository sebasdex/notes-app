import { NextResponse } from "next/server";
import { createClient } from "@/config/supabaseServer";

export async function GET(req: Request) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    const userId = data?.user?.id;

    if (error || !userId) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const { data: archivedNotes, error: notesError } = await supabase
      .from("newNotes")
      .select("*")
      .eq("user_id", userId)
      .eq("isDeleted", false)
      .eq("isArchived", true)
      .order("date", { ascending: false })
      .order("hour", { ascending: false });
    if (notesError) throw notesError;
    return NextResponse.json({ archivedNotes }, { status: 200 });
  } catch (error) {
    console.error("❌ Error en API:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
