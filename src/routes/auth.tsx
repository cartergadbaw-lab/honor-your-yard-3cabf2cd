import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Admin Sign In — Gentleman's Outdoor Services" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      navigate({ to: "/admin" });
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-md px-6 py-24">
      <h1 className="font-serif text-4xl text-foreground">{mode === "signin" ? "Sign In" : "Create Account"}</h1>
      <p className="mt-2 text-sm text-muted-foreground">Admin access for quote requests.</p>
      <form onSubmit={submit} className="mt-8 grid gap-4 rounded-2xl border border-border/60 bg-card p-6">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Password</label>
          <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button disabled={loading} type="submit"
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">
          {loading ? "Please wait..." : mode === "signin" ? "Sign In" : "Create Account"}
        </button>
        <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="text-xs text-muted-foreground underline">
          {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>
        <Link to="/" className="text-xs text-muted-foreground">← Back to site</Link>
      </form>
    </section>
  );
}
