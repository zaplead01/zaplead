"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/src/services/auth.service";
import { onboardingService } from "@/src/services/onboarding.service";

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
    console.log("Login realizado, iniciando onboarding...");
    await onboardingService.initialize();

    router.replace("/dashboard");

    return {
      success: true,
    };
  } catch (error) {
    console.error("ERRO NO LOGIN:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Erro ao realizar login.",
    };
  } finally {
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

  return {
    loading,
    login,
    register,
    logout,
  };
}