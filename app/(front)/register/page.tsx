import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Inscription",
  description: "Créez votre compte My supa store",
};

export default function RegisterPage() {
  return (
    <div className="mx-auto w-full max-w-md flex-1 px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-lavender-900 dark:text-lavender-100">
        Inscription
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Créez un compte pour accéder à votre espace.
      </p>
      <div className="mt-8 rounded-2xl border border-lavender-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <RegisterForm />
      </div>
    </div>
  );
}
