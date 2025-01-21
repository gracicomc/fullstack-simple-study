import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para navegação
import { useForm } from "react-hook-form";
import { loginUser } from "../../services/login.queries"; // Importando a query de login

interface LoginFormData {
  email: string;
  password: string;
}

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginUser(data); // Fazendo a requisição com a query
      console.log("Login bem-sucedido:", response);
      navigate("/"); // Redireciona para a página inicial após o login
    } catch (error: any) {
      setErrorMessage(error?.response?.data?.message || "Erro no login");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
      <div>
        <label htmlFor="email" className="block">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email", { required: "Email é obrigatório" })}
          className="input"
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <label htmlFor="password" className="block">
          Senha
        </label>
        <input
          id="password"
          type="password"
          {...register("password", { required: "Senha é obrigatória" })}
          className="input"
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      {errorMessage && <div className="text-red-500">{errorMessage}</div>}

      <button type="submit" className="button">
        Entrar
      </button>
    </form>
  );
}
