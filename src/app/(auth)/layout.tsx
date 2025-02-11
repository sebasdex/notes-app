import { Toaster } from "sonner";

export default function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-gray-300 min-h-screen flex flex-col items-center justify-center">
      <main className="w-full">
        {children}
        <Toaster richColors position="top-center" />
      </main>
    </div>
  );
}
