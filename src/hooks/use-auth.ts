"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/src/services/auth.service";
import { accountInitializationService } from "@/src/services/account-initialization.service";

export function useAuth() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function login(email: string, password: string) {
  setLoading(true);

  try {
    const { error } = await authService.login(email, password);

    console.log("LOGIN ERROR:", error);

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    // Inicializa o usuário no sistema
    const session = await authService.session();

const user = session.data.session?.user;

if (!user) {
  throw new Error("Usuário não encontrado.");
}

await accountInitializationService.initialize(
  user.id
);

router.replace("/dashboard");

    return {
      success: true,
    };
  } catch (error: any) {
  console.error("ERRO COMPLETO:", error);
  console.error("MESSAGE:", error?.message);
  console.error("STACK:", error?.stack);

  return {
    success: false,
    message: error?.message ?? "Erro ao realizar login.",
  };
}finally {
    setLoading(false);
  }
}

  async function register(data: {
    fullName: string;
    business: string;
    phone: string;
    email: string;
    password: string;
  }) {
    setLoading(true);

    try {
      const { error } = await authService.register(
        data.fullName,
        data.business,
        data.phone,
        data.email,
        data.password
      );

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      router.replace("/login");

      return {
        success: true,
      };
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await authService.logout();

    router.replace("/login");
  }

  async function forgotPassword(email: string) {
  setLoading(true);

  try {
    const result = await authService.forgotPassword(email);

    if (!result.success) {
      return {
        success: false,
        message: result.message,
      };
    }

    return {
      success: true,
      message: "E-mail enviado com sucesso.",
    };
  } finally {
    setLoading(false);
  }
}

async function updatePassword(password: string) {
  setLoading(true);

  try {
    const result = await authService.updatePassword(password);

    if (!result.success) {
      return {
        success: false,
        message: result.message,
      };
    }

    return {
      success: true,
      message: result.message,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Erro ao atualizar senha.",
    };
  } finally {
    setLoading(false);
  }
}

return {
  loading,
  login,
  register,
  logout,
  forgotPassword,
  updatePassword,
};



}