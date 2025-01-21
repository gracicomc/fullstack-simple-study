// src/components/forms/SignUpForm.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

// Definindo o schema de validação com Zod
const signUpSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

// Tipagem do formulário de cadastro
type SignUpFormData = {
  email: string;
  password: string;
};

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  // Função de envio do formulário
  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        data
      );
      console.log(response);
      alert("Usuário registrado com sucesso!");
      // Redirecionar ou limpar o formulário conforme necessário
    } catch (error) {
      console.error(error);
      alert("Erro ao registrar o usuário.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email" className="block">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
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
          {...register("password")}
          className="input"
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <button type="submit" className="btn">
        Registrar
      </button>
    </form>
  );
};

export default SignUpForm;
