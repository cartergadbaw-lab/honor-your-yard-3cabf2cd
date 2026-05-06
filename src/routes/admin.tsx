import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type QuoteRequest = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Quote Requests" }] }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!mounted) return;
      if (!session) {
        navigate({ to: "/auth" });
        return;
      }
      setUserEmail(session.user.email ?? null);

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);

      const admin = !!roles?.some((r) => r.role === "admin");
      setIsAdmin(admin);

      if (admin) {
        const { data, error } = await supabase
          .from("quote_requests")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) setError(error.message);
        else setRequests((data as QuoteRequest[]) ?? []);
      }
      setLoading(false);
    };

    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate({ to: "/auth" });
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("quote_requests").update({ status }).eq("id", id);
    if (!error) setRequests((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this request?")) return;
    const { error } = await supabase.from("quote_requests").delete().eq("id", id);
    if (!error) setRequests((rs) => rs.filter((r) => r.id !== id));
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  if (loading) {
    return <div className="mx-auto max-w-7xl px-6 py-24 text-muted-foreground">Loading...</div>;
  }

  if (!isAdmin) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-24">
        <h1 className="font-serif text-3xl text-foreground">Not authorized</h1>
        <p className="mt-3 text-muted-foreground">
          You're signed in as <span className="font-medium">{userEmail}</span>, but this account doesn't have admin access.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          To grant admin access, ask the site owner to add your account to the admin list in the backend.
        </p>
        <button onClick={signOut} className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          Sign out
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl text-foreground">Quote Requests</h1>
          <p className="mt-1 text-sm text-muted-foreground">{requests.length} total · signed in as {userEmail}</p>
        </div>
        <button onClick={signOut} className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium">
          Sign out
        </button>
      </div>

      {error && <p className="mt-6 text-sm text-destructive">{error}</p>}

      {requests.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-border/60 bg-card p-10 text-center text-muted-foreground">
          No quote requests yet.
        </div>
      ) : (
        <div className="mt-8 grid gap-4">
          {requests.map((r) => (
            <article key={r.id} className="rounded-2xl border border-border/60 bg-card p-6">
              <header className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-serif text-xl text-foreground">{r.name}</h2>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {new Date(r.created_at).toLocaleString()}
                  </div>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                  r.status === 'new' ? 'bg-primary/10 text-primary' :
                  r.status === 'contacted' ? 'bg-yellow-100 text-yellow-900' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {r.status}
                </span>
              </header>
              <dl className="mt-4 grid gap-2 text-sm md:grid-cols-2">
                <div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Email</dt>
                  <dd><a className="text-foreground underline" href={`mailto:${r.email}`}>{r.email}</a></dd></div>
                <div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Phone</dt>
                  <dd>{r.phone ? <a className="text-foreground underline" href={`tel:${r.phone}`}>{r.phone}</a> : <span className="text-muted-foreground">—</span>}</dd></div>
                <div className="md:col-span-2"><dt className="text-xs uppercase tracking-wider text-muted-foreground">Address</dt>
                  <dd>{r.address || <span className="text-muted-foreground">—</span>}</dd></div>
                <div className="md:col-span-2"><dt className="text-xs uppercase tracking-wider text-muted-foreground">Message</dt>
                  <dd className="whitespace-pre-wrap">{r.message || <span className="text-muted-foreground">—</span>}</dd></div>
              </dl>
              <div className="mt-5 flex flex-wrap gap-2">
                {['new', 'contacted', 'closed'].map((s) => (
                  <button key={s} onClick={() => updateStatus(r.id, s)} disabled={r.status === s}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium disabled:opacity-50">
                    Mark {s}
                  </button>
                ))}
                <button onClick={() => remove(r.id)}
                  className="ml-auto rounded-full border border-destructive/30 bg-background px-3 py-1.5 text-xs font-medium text-destructive">
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
