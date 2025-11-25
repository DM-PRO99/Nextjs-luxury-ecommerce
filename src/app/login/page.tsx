"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import "@/libs/i18n/config";

function Signin() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError(res.error as string);
      return;
    }

    if (res?.ok) return router.push("/store");
  };

  const handleGoogleSignin = async () => {
    try {
      setGoogleLoading(true);
      await signIn("google", {
        callbackUrl: "/store",
      });
    } catch (err) {
      console.error(err);
      setError("No pudimos conectar con Google. Intenta de nuevo.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/store" className="inline-block">
            <h1 className="text-3xl font-serif font-bold text-gradient-gold mb-2">
              CHRONOS
            </h1>
          </Link>
          <p className="text-platinum/60">Welcome back to luxury</p>
        </div>

        <div className="luxury-card p-8">
          <h2 className="text-2xl font-serif font-bold mb-6 text-center">
            {t("auth.signInTitle")}
          </h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-platinum/80 mb-2">
                {t("auth.email")}
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-platinum/5 border border-platinum/10 rounded-lg px-4 py-3 text-platinum placeholder:text-platinum/40 focus:outline-none focus:border-champagne/50 transition-colors"
                name="email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-platinum/80 mb-2">
                {t("auth.password")}
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-platinum/5 border border-platinum/10 rounded-lg px-4 py-3 text-platinum placeholder:text-platinum/40 focus:outline-none focus:border-champagne/50 transition-colors"
                name="password"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading}
            >
              {loading ? "..." : t("auth.signInTitle")}
            </Button>
          </form>

          <div className="mt-6">
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              size="lg"
              onClick={handleGoogleSignin}
              disabled={googleLoading}
            >
              <span className="inline-flex items-center justify-center rounded-full bg-white p-1">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill="#EA4335"
                    d="M12 10.2v4.4h6.2c-.3 1.6-1.8 4.6-6.2 4.6-3.7 0-6.8-3.1-6.8-7s3.1-7 6.8-7c2.1 0 3.5.9 4.3 1.7l3-2.9C17.3 1.8 14.9.6 12 .6 5.8.6.8 5.6.8 11.8S5.8 23 12 23c6.9 0 11.2-4.9 11.2-11.8 0-.8-.1-1.4-.2-2H12z"
                  />
                </svg>
              </span>
              {googleLoading ? "Connecting..." : "Sign in with Google"}
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-platinum/60 text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-champagne hover:text-champagne-dark transition-colors font-medium"
              >
                {t("auth.signUpTitle")}
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/store"
            className="text-platinum/60 hover:text-champagne transition-colors text-sm"
          >
            ← Back to store
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;
