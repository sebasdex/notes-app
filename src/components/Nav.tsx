import Link from "next/link";

function Nav() {
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
      <section className="min-w-fit w-full flex justify-center items-center gap-4 md:w-auto md:justify-end">
        <p className="text-sm font-medium">Welcome, John Doe</p>

        <img
          id="avatarButton"
          data-dropdown-toggle="userDropdown"
          data-dropdown-placement="bottom-start"
          className="w-10 h-10 rounded-full cursor-pointer ring-2 text-xs object-cover object-top"
          src="https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg"
          alt="User dropdown"
          typeof="button"
        />
      </section>
    </nav>
  );
}

export default Nav;
