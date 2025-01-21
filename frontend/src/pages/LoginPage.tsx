import { LoginForm } from "../components/organisms/LoginForm";

export function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <header className="w-full p-4 bg-white shadow-md flex justify-between">
        <h1 className="text-xl font-bold">Login</h1>
      </header>
      <LoginForm />
      <footer className="w-full p-4 bg-white shadow-md text-center">
        <p>&copy; 2025 Meu Projeto</p>
      </footer>
    </div>
  );
}
