import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Connectez-vous à My supa store",
};

export default function LoginPage() {
  return (
    <div className="mx-auto w-full max-w-md flex-1 px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-lavender-900 dark:text-lavender-100">
        Connexion
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Accédez à votre espace personnel.
      </p>
      <div className="mt-8 rounded-2xl border border-lavender-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <LoginForm />
      </div>
    </div>
  );
}
