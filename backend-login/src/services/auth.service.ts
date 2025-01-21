import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../utils/hash.utils";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";

// Função para registrar um novo usuário
export async function registerUser(email: string, password: string) {
  const hashedPassword = await hashPassword(password);
  return prisma.user.create({
    data: { email, password: hashedPassword },
  });
}

// Função para autenticar um usuário
export async function authenticateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  const isValidPassword = await comparePassword(password, user.password);
  if (!isValidPassword) {
    throw new Error("Senha incorreta.");
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return { user, token };
}
