import api from "./api"; // Sua instância do Axios

interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginData) => {
  const response = await api.post("/login", data); // Envia o POST para a rota de login
  return response.data; // Retorna a resposta da API
};

export const registerUser = async (data: LoginData) => {
  const response = await api.post("/register", data); // Envia o POST para a rota de registro
  return response.data; // Retorna a resposta da API
};
