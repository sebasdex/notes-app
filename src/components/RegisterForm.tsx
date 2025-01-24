import { toast } from "sonner";
import { signup } from "@/app/(auth)/login/actions";

interface RegisterFormProps {
  setIsRegister: (value: boolean) => void;
}

function RegisterForm({ setIsRegister }: RegisterFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = new FormData(e.currentTarget);
      const password = data.get("password") as string;
      const confirmPassword = data.get("confirmPassword") as string;

      if (password !== confirmPassword) {
        toast.error("Las contraseñas no coinciden.");
        return;
      }
      const response = await signup(data);
      if (response?.error) {
        if (response.error === 'Password should be at least 8 characters.') {
          return toast.error('La contraseña debe tener al menos 8 caracteres.');
        }
        toast.error(response.error);
        return;
      }
      toast.success("Registro exitoso, se enviará un correo de confirmación.");
      setIsRegister(false);
    } catch (error) {
      console.error("Error inesperado:", error);
      toast.error("Ocurrió un error inesperado. Intenta nuevamente.");
    }
  };
  return (
    <section className="bg-gray-200 rounded-xl max-w-md p-8 mx-auto shadow-lg">
      <h1 className="text-3xl font-semibold text-gray-700 mb-6 text-center">
        Regístrate
      </h1>

      <button
        type="button"
        className="flex items-center justify-center w-full mb-6 text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 transition-all"
      >
        <svg
          className="w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 18"
          aria-hidden="true"
        >
          <path
            d="M9 3.48c1.69 0 2.88.73 3.54 1.35l2.65-2.65C13.82.9 11.67 0 9 0 5.48 0 2.44 2.03 1 5.01l3.1 2.41C4.86 4.61 6.77 3.48 9 3.48z"
            fill="#EA4335"
          />
          <path
            d="M17.64 9.2c0-.63-.06-1.25-.18-1.84H9v3.48h4.91c-.21 1.14-.85 2.09-1.8 2.73l2.82 2.2c1.65-1.52 2.71-3.76 2.71-6.57z"
            fill="#4285F4"
          />
          <path
            d="M3.1 10.44c-.24-.7-.37-1.45-.37-2.22 0-.77.13-1.51.36-2.21L1 5.01C.36 6.25 0 7.59 0 9c0 1.41.36 2.75 1 3.99l3.1-2.55z"
            fill="#FBBC05"
          />
          <path
            d="M9 18c2.43 0 4.47-.8 5.96-2.17l-2.82-2.2c-.78.52-1.77.82-2.84.82-2.23 0-4.14-1.12-5.24-2.82L1 13.99C2.44 16.97 5.48 18 9 18z"
            fill="#34A853"
          />
          <path fill="none" d="M0 0h18v18H0z" />
        </svg>
        Registrarse con Google
      </button>

      <div className="relative flex items-center justify-center w-full mb-6">
        <hr className="w-full h-px bg-gray-300 border-0" />
        <span className="absolute px-3 bg-gray-200 text-sm text-gray-500">
          o
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="block w-full px-4 py-2 text-sm bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-800 placeholder-gray-500 transition-all"
            placeholder="Ingresa tu correo"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="block w-full px-4 py-2 text-sm bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-800 placeholder-gray-500 transition-all"
            placeholder="••••••••"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirm-password"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Confirmar Contraseña
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirm-password"
            className="block w-full px-4 py-2 text-sm bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-800 placeholder-gray-500 transition-all"
            placeholder="••••••••"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-5 py-2.5 text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-400 rounded-lg transition-all"
        >
          Crear cuenta
        </button>
      </form>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <button
            onClick={() => setIsRegister(false)}
            className="text-blue-500 hover:underline"
          >
            Inicia sesión
          </button>
        </p>
      </div>
    </section>
  );
}

export default RegisterForm;
