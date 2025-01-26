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
        if (response.error === "Password should be at least 8 characters.") {
          return toast.error("La contraseña debe tener al menos 8 caracteres.");
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
