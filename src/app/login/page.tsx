"use client";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function Signin() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/store" className="inline-block">
            <h1 className="text-3xl font-serif font-bold text-gradient-gold mb-2">CHRONOS</h1>
          </Link>
          <p className="text-platinum/60">Welcome back to luxury</p>
        </div>

        <div className="luxury-card p-8">
          <h2 className="text-2xl font-serif font-bold mb-6 text-center">Sign In</h2>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-platinum/80 mb-2">
                Email
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
                Password
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
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-platinum/60 text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-champagne hover:text-champagne-dark transition-colors font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/store" className="text-platinum/60 hover:text-champagne transition-colors text-sm">
            ← Back to store
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;
