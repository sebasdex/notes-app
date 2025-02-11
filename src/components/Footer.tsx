import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="py-4">
      <div className="container mx-auto flex flex-col items-center gap-2 text-center text-xs text-gray-500">
        <p>
          🎨 Inspirado en el diseño de{" "}
          <Link
            href="https://dribbble.com/shots/16997848-MINO-Note-taking-app"
            target="_blank"
            rel="noreferrer noopener"
            className="font-medium text-gray-600 hover:text-gray-800 transition-colors"
          >
            Sayef Mahmud
          </Link>
        </p>
        <p>
          🚀 Desarrollado por{" "}
          <Link
            href="https://github.com/sebasdex"
            className="font-medium text-gray-600 hover:text-gray-800 transition-colors"
            target="_blank"
            rel="noreferrer noopener"
          >
            @sebasdex
          </Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
