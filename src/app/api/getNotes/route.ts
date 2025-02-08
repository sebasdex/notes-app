import { NextResponse } from "next/server";
import { createClient } from "@/config/supabaseServer";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user?.id) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const userId = data.user.id;
    const { data: notes, error: notesError } = await supabase
      .from("newNotes")
      .select("*")
      .eq("user_id", userId)
      .eq("isDeleted", false)
      .eq("isArchived", false)
      .order("date", { ascending: false })
      .order("hour", { ascending: false });

    if (notesError) throw notesError;
    return NextResponse.json({ notes }, { status: 200 });
  } catch (error) {
    console.error("❌ Error en API /getNotes:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
