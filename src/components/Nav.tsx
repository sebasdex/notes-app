"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { logOut } from "@/app/(auth)/login/actions";
import { createClient } from "@/config/supabaseClient";
import { User } from "@supabase/supabase-js";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const dataUser = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        setUser(null)
      } else {
        setUser(data.user)
      }
    }
    dataUser()
  }, []);

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
    <nav className="min-w-80 w-full flex flex-col justify-center items-center gap-4 md:flex-row md:justify-between p-4 nav">
      <Link href="/">
        <h1 className="min-w-fit text-2xl font-bold text-blue-900 lg:ml-10 md:w-auto">
          Note App
        </h1>
      </Link>
      <input
        type="text"
        name="search"
        placeholder="Search..."
        className="min-w-fit w-full rounded-md bg-gray-100 p-2 text-sm border-none outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 text-gray-700 md:w-2/5"
      />
      <section
        ref={menuRef}
        className="relative min-w-fit w-full flex justify-center items-center gap-4 md:w-auto md:justify-end"
      >
        <Image
          id="avatarButton"
          data-dropdown-toggle="userDropdown"
          data-dropdown-placement="bottom-start"
          className="w-10 h-10 rounded-full cursor-pointer ring-2 text-xs object-cover object-top"
          src="https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg"
          alt="User dropdown"
          typeof="button"
          width={40}
          height={40}
          onClick={() => setIsOpen((prev) => !prev)}
        />

        {isOpen && (
          <div className="absolute top-10 right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-4 py-3 text-sm text-gray-900">
              <div>Bienvenido</div>
              <div className="font-medium truncate">{user?.email}</div>
            </div>
            <div className="py-1">
              <button
                onClick={logOut}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Salir
              </button>
            </div>
          </div>
        )}
      </section>
    </nav>
  );
}

export default Nav;
