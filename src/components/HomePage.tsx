"use client";
import NoteIcon from "@/icons/NoteIcon";
import React from "react";
import Note from "./Note";
import { User } from "@supabase/supabase-js";
import { Toaster } from "sonner";

function HomePage({ user }: { user: User | null }) {
  return (
    <>
      <Toaster position="top-center" richColors />
      <section className="p-4">
        <div className="flex items-center gap-2">
          <NoteIcon width={"24"} height={"24"} />
          <h1 className="text-3xl font-bold">Mis notas</h1>
        </div>
        <hr className="h-px my-4 bg-gray-300 border-0"></hr>
        <Note user={user} />
      </section>
    </>
  );
}

export default HomePage;
