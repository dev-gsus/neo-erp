"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

function EmailIcon() {
  return (
    <svg
      aria-hidden="true"
      className="field-icon"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M4 6.75h16v10.5H4z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="m4.5 7.5 7.5 6 7.5-6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      aria-hidden="true"
      className="field-icon"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect
        x="5"
        y="10"
        width="14"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M8 10V7.5a4 4 0 0 1 8 0V10"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M12 14v2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function OfficeIllustration() {
  return (
    <svg
      aria-hidden="true"
      className="office-illustration"
      viewBox="0 0 900 700"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="office-wall" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#0d776c" />
          <stop offset="1" stopColor="#134c4c" />
        </linearGradient>
        <linearGradient id="office-floor" x1="0" x2="0.8" y1="0" y2="1">
          <stop offset="0" stopColor="#155f58" />
          <stop offset="1" stopColor="#083b3d" />
        </linearGradient>
      </defs>
      <rect width="900" height="700" fill="url(#office-wall)" />
      <path d="M0 0h900L730 155H170z" fill="#167e72" opacity=".58" />
      <path
        d="M170 155h560v325H170z"
        fill="#155d59"
        stroke="#78c9b8"
        strokeOpacity=".36"
        strokeWidth="5"
      />
      <path
        d="M190 175h520v285H190z"
        fill="#0c494a"
        stroke="#8bd4c4"
        strokeOpacity=".48"
        strokeWidth="3"
      />
      <path d="M365 176v284m175-284v284M191 310h518" stroke="#78c9b8" strokeOpacity=".42" strokeWidth="4" />
      <path
        d="M0 530 170 480h560l170 50v170H0z"
        fill="url(#office-floor)"
      />
      <path d="M0 570h900M95 700l155-220m145 220 65-220m220 220L565 480" stroke="#85cbb9" strokeOpacity=".24" strokeWidth="3" />
      <path
        d="M230 435h435v80H230z"
        fill="#0b4646"
        stroke="#83cbb9"
        strokeOpacity=".55"
        strokeWidth="4"
      />
      <path d="M265 515v120m360-120v120" stroke="#0a4142" strokeWidth="18" />
      <path
        d="M100 185h55v300h-55zm645 0h55v300h-55z"
        fill="#103f43"
        opacity=".78"
      />
      <path d="M125 215h5v210h-5m645-210h5v210h-5" fill="#79cbbb" opacity=".38" />
      <g fill="#082f35">
        <circle cx="345" cy="388" r="25" />
        <path d="M322 418q23-18 46 0l17 102h-78z" />
        <path d="m330 510-9 112h18l20-105m-1 0 21 105h18l-16-112" />
        <circle cx="545" cy="375" r="22" />
        <path d="M523 402q22-18 44 0l15 103h-74z" />
        <path d="m529 500-10 115h17l20-107m0 0 19 107h17l-15-115" />
      </g>
      <path d="M220 118 360 0m-65 118L435 0m35 118L590 0m-35 118L685 0" stroke="#a3e4d5" strokeOpacity=".22" strokeWidth="5" />
      <path d="M0 0h900v700H0z" fill="#007c70" opacity=".28" />
    </svg>
  );
}

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        setError("E-mail ou senha inválidos.");
        return;
      }

      router.push("/dashboard");
    } catch (cause) {
      if (cause instanceof TypeError) {
        setError("Não foi possível conectar. Tente novamente.");
        return;
      }

      throw cause;
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-shell" aria-label="Acesso ao NEO ERP">
        <div className="login-visual">
          <OfficeIllustration />
          <div className="visual-tint" />
          <div className="visual-grid" />
          <div className="visual-caption">
            <span className="visual-caption-dot" />
            <span>Gestão simples. Visão completa.</span>
          </div>
        </div>

        <div className="login-panel">
          <div className="login-content">
            <Image
              className="brand-logo"
              src="/neo-erp-wordmark.png"
              alt="NEO ERP"
              width={715}
              height={190}
              priority
            />

            <header className="login-heading">
              <h1>Bem-vindo</h1>
              <p>Entre na sua conta para continuar</p>
            </header>

            <form onSubmit={handleLogin} className="login-form">
              <label className="visually-hidden" htmlFor="email">
                E-mail corporativo
              </label>
              <div className="input-wrap">
                <EmailIcon />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="voce@empresa.com.br"
                  autoComplete="username"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "login-error" : undefined}
                  required
                />
              </div>

              <label className="visually-hidden" htmlFor="password">
                Senha
              </label>
              <div className="input-wrap">
                <LockIcon />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "login-error" : undefined}
                  required
                />
              </div>

              {error && (
                <p id="login-error" className="login-error" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </button>
            </form>

            <p className="login-footer">
              Acesso restrito a usuários autorizados.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
