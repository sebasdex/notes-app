"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { logOut } from "@/app/(auth)/login/actions";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

function NavClient({ user }: { user: User | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const handleLogOut = async () => {
    const respomnse = await logOut();
    if (respomnse.error) {
      alert(respomnse.error);
      return;
    }
    router.replace("/");
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full flex flex-col md:flex-row md:justify-between items-center gap-4 p-4 nav">
      <div className="min-w-fit md:ml-8">
        <Link href="/">
          <h1 className="text-2xl font-bold text-blue-900">Note App</h1>
        </Link>
      </div>
      <div role="search" className="w-full md:w-2/5">
        <input
          type="text"
          name="search"
          placeholder="Search..."
          className="w-full rounded-md bg-gray-100 p-2 text-sm border-none outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 text-gray-700"
        />
      </div>
      {!user ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md:mr-2"
          onClick={() => router.push("/login")}
        >
          Iniciar sesión
        </button>
      ) : (
        <nav
          className="relative min-w-fit flex justify-center items-center gap-4 md:w-auto md:justify-end"
          aria-label="User menu"
          ref={menuRef}
        >
          <button
            id="avatarButton"
            aria-haspopup="true"
            aria-expanded={isOpen}
            className="w-10 h-10 rounded-full ring-2 text-xs object-cover object-top focus:outline-none"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <Image
              src="https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg"
              alt="User dropdown"
              width={40}
              height={40}
              className="rounded-full w-full h-full object-cover object-top"
            />
          </button>

          {isOpen && (
            <div
              id="userDropdown"
              className="absolute top-10 right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-labelledby="avatarButton"
            >
              <div className="px-4 py-3 text-sm text-gray-900">
                <div>Bienvenido</div>
                <div className="font-medium truncate">{user.email}</div>
              </div>
              <div className="py-1">
                <button
                  onClick={handleLogOut}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  role="menuitem"
                >
                  Salir
                </button>
              </div>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}

export default NavClient;
