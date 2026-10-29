import { redirect } from "next/navigation";
import { signOut } from "./actions";
import { createClient } from "@/lib/supabase/server";

export const instant = false;

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error && error.name !== "AuthSessionMissingError") {
    throw error;
  }

  if (!user) {
    redirect("/");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12 text-slate-900">
      <section className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
          NEO ERP
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          Acesso autenticado
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Esta é uma página provisória para validar o fluxo de autenticação. O
          dashboard e as funcionalidades do ERP ainda não foram implementados.
        </p>
        <p className="mt-6 break-all rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700">
          Conta: {user.email ?? "Usuário autenticado"}
        </p>
        <form action={signOut} className="mt-8">
          <button
            type="submit"
            className="rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          >
            Sair da conta
          </button>
        </form>
      </section>
    </main>
  );
}
