"use client";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function Signup() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const formData = new FormData(event.currentTarget);
      const signupResponse = await axios.post("/api/auth/signup", {
        email: formData.get("email"),
        password: formData.get("password"),
        fullname: formData.get("fullname"),
      });
      
      const res = await signIn("credentials", {
        email: signupResponse.data.email,
        password: formData.get("password"),
        redirect: false,
      });

      if (res?.ok) return router.push("/store");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message;
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/store" className="inline-block">
            <h1 className="text-3xl font-serif font-bold text-gradient-gold mb-2">CHRONOS</h1>
          </Link>
          <p className="text-platinum/60">Join the world of luxury timepieces</p>
        </div>

        <div className="luxury-card p-8">
          <h2 className="text-2xl font-serif font-bold mb-6 text-center">Create Account</h2>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-platinum/80 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full bg-platinum/5 border border-platinum/10 rounded-lg px-4 py-3 text-platinum placeholder:text-platinum/40 focus:outline-none focus:border-champagne/50 transition-colors"
                name="fullname"
                required
                minLength={3}
                maxLength={20}
              />
            </div>

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
                minLength={6}
              />
              <p className="text-xs text-platinum/40 mt-1">Minimum 6 characters</p>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-platinum/60 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-champagne hover:text-champagne-dark transition-colors font-medium">
                Sign in
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

export default Signup;
