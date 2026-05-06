import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Gentleman's Outdoor Services" },
      { name: "description", content: "Request a free landscaping quote. We respond within one business day." },
      { property: "og:title", content: "Contact Gentleman's Outdoor Services" },
      { property: "og:description", content: "Request a free landscaping quote." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/public/quote-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(fd.get('name') || '').trim(),
          email: String(fd.get('email') || '').trim(),
          phone: String(fd.get('phone') || '').trim() || null,
          address: String(fd.get('address') || '').trim() || null,
          message: String(fd.get('message') || '').trim() || null,
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      setSent(true);
    } catch {
      setError("Something went wrong. Please call us or try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="bg-[var(--cream)] border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <span className="text-xs uppercase tracking-[0.25em] text-[var(--accent)]">Get in touch</span>
          <h1 className="mt-3 max-w-3xl font-serif text-5xl font-semibold text-foreground md:text-6xl">
            Tell us about your yard.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Send a note and we'll respond within one business day with next steps and a complimentary on-site walk-through.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-[1.2fr_1fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border/60 bg-card p-8 shadow-[var(--shadow-soft)]"
        >
          {sent ? (
            <div className="py-12 text-center">
              <h3 className="font-serif text-3xl text-foreground">Thank you.</h3>
              <p className="mt-2 text-muted-foreground">We'll be in touch within one business day.</p>
            </div>
          ) : (
            <div className="grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Name" name="name" required />
                <Field label="Phone" name="phone" type="tel" />
              </div>
              <Field label="Email" name="email" type="email" required />
              <Field label="Property address" name="address" />
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">How can we help?</label>
                <textarea
                  name="message"
                  rows={5}
                  className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Tell us what you're looking for..."
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <button type="submit" disabled={submitting} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5 disabled:opacity-60">
                {submitting ? 'Sending...' : 'Send Request'} <Send className="h-4 w-4" />
              </button>
            </div>
          )}
        </form>

        <aside className="space-y-6">
          {[
            { Icon: Phone, t: "Call", d: "(734) 679-9573" },
            { Icon: Mail, t: "Email", d: "gentlemansoutdoorservices@gmail.com" },
            { Icon: MapPin, t: "Service Area", d: "Livingston County" },
            { Icon: Clock, t: "Hours", d: "Mon–Sun · 7am – 7pm" },
          ].map(({ Icon, t, d }) => (
            <div key={t} className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--gold)] text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t}</div>
                <div className="mt-0.5 font-serif text-lg text-foreground">{d}</div>
              </div>
            </div>
          ))}
        </aside>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-foreground">{label}{required && " *"}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
