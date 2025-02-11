import Nav from "@/components/Nav";
import SideBar from "@/components/SideBar";
import { NoteAppProvider } from "@/context/ContextNoteApp";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NoteAppProvider>
      <div className="grid-area-container">
        <Nav />
        <SideBar />
        <main className="main">{children}</main>
      </div>
    </NoteAppProvider>
  );
}
