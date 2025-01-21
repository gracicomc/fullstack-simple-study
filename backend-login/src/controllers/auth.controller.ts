import { Request, Response } from "express";
import { registerUser, authenticateUser } from "../services/auth.service";

// Registrar um novo usuário
export async function register(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email e senha são obrigatórios." });
    return;
  }

  try {
    const user = await registerUser(email, password);
    res.status(201).json({ message: "Usuário registrado com sucesso!", user });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Erro ao registrar usuário.",
        details: (error as Error).message,
      });
  }
}

// Autenticar um usuário
export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email e senha são obrigatórios." });
    return;
  }

  try {
    const { user, token } = await authenticateUser(email, password);
    res.status(200).json({ message: "Login bem-sucedido!", user, token });
  } catch (error) {
    res
      .status(401)
      .json({
        error: "Erro ao realizar login.",
        details: (error as Error).message,
      });
  }
}
