import { authRepository } from "@/src/repositories/auth.repository";
import { ServiceResponse } from "@/src/types/responses/service-response";

class AuthService {
  async register(
    fullName: string,
    business: string,
    phone: string,
    email: string,
    password: string
  ): Promise<ServiceResponse> {
    const { error } = await authRepository.signUp(email, password, {
      full_name: fullName,
      business,
      phone,
    });

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "Conta criada com sucesso.",
    };
  }

  async login(
    email: string,
    password: string
  ): Promise<ServiceResponse> {
    const { error } = await authRepository.signIn(email, password);

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "Login realizado com sucesso.",
    };
  }

  async logout(): Promise<ServiceResponse> {
    const { error } = await authRepository.signOut();

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "Logout realizado.",
    };
  }

  async me() {
    return authRepository.getUser();
  }

  async session() {
    return authRepository.getSession();
  }

  async forgotPassword(email: string): Promise<ServiceResponse> {
    const { error } = await authRepository.resetPassword(email);

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "Email de recuperação enviado.",
    };
  }
}

export const authService = new AuthService();