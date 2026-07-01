import { supabase } from "@/src/lib/supabase/client";

class AuthRepository {
  async signUp(
    email: string,
    password: string,
    metadata: Record<string, unknown>
  ) {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
  }

  async signIn(email: string, password: string) {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  }

  async signOut() {
    return await supabase.auth.signOut();
  }

  async getUser() {
    return await supabase.auth.getUser();
  }

  async getSession() {
    return await supabase.auth.getSession();
  }

  async resetPassword(email: string) {
    return await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
    });
  }

  async updatePassword(password: string) {
  return await supabase.auth.updateUser({
    password,
  });
}
}

export const authRepository = new AuthRepository();