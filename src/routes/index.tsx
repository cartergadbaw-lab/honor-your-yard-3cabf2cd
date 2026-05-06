import { createFileRoute, Link } from "@tanstack/react-router";
import { Scissors, Sprout, TreePine, Award, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-lawn.jpg";
import lawnImg from "@/assets/service-lawn.jpg";
import hedgesImg from "@/assets/service-hedges.jpg";
import designImg from "@/assets/service-design.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gentleman's Outdoor Services — Your Yard, Our Honor" },
      { name: "description", content: "Premium landscaping, lawn care, and garden design delivered with old-fashioned craftsmanship." },
      { property: "og:title", content: "Gentleman's Outdoor Services" },
      { property: "og:description", content: "Your Yard, Our Honor — premium landscaping and lawn care." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="Manicured lawn at golden hour in front of an elegant home"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-6 py-24 text-[var(--cream)]">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-black/20 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-[var(--gold)] backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" /> Est. Craftsmanship
          </span>
          <h1 className="mt-6 max-w-3xl font-serif text-5xl font-semibold leading-[1.05] md:text-7xl">
            Your Yard, <span className="italic text-[var(--gold)]">Our Honor.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/85">
            Gentleman's Outdoor Services delivers refined landscaping and meticulous lawn care —
            the way it ought to be done.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-7 py-3.5 text-sm font-semibold text-primary shadow-[var(--shadow-elegant)] transition-transform hover:-translate-y-0.5"
            >
              Request a Free Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/10"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-border/60 bg-[var(--cream)]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-10 md:grid-cols-3">
          {[
            { Icon: Award, t: "Family Owned", d: "Built on reputation, not shortcuts." },
            { Icon: ShieldCheck, t: "Licensed & Insured", d: "Full coverage on every property." },
            { Icon: Clock, t: "On-Time, Every Time", d: "Punctual service, week after week." },
          ].map(({ Icon, t, d }) => (
            <div key={t} className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <div className="font-serif text-lg text-foreground">{t}</div>
                <div className="text-sm text-muted-foreground">{d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[var(--accent)]">What we do</span>
            <h2 className="mt-3 max-w-xl font-serif text-4xl font-semibold text-foreground md:text-5xl">
              Estate-grade care for every corner of your property.
            </h2>
          </div>
          <Link to="/services" className="text-sm font-semibold text-primary hover:underline">
            All services →
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { Icon: Scissors, img: lawnImg, t: "Lawn Care & Edging", d: "Crisp edging, weed control, and seasonal cleanups (we don't mow)." },
            { Icon: TreePine, img: hedgesImg, t: "Hedge & Tree", d: "Precision trimming, pruning, and shrub shaping." },
            { Icon: Sprout, img: designImg, t: "Garden Design", d: "Beds, mulch, hardscapes, and seasonal plantings." },
          ].map(({ Icon, img, t, d }) => (
            <article
              key={t}
              className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={img}
                  alt={t}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--gold)] text-primary shadow-md">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl text-foreground">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Quote band */}
      <section className="bg-[var(--forest)] text-[var(--cream)]">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="font-serif text-3xl italic leading-snug md:text-4xl">
            “They don't just cut grass — they care for the place like it's their own.
            That's the gentleman's way.”
          </p>
          <div className="mt-6 text-sm uppercase tracking-[0.2em] text-[var(--gold)]">
            — Colossians 3:23
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-[var(--cream)] to-secondary p-10 text-center md:p-16">
          <h2 className="font-serif text-4xl font-semibold text-foreground md:text-5xl">
            Ready to elevate your property?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Tell us about your yard. We'll come measure, listen, and deliver a thoughtful estimate — no pressure.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] transition-transform hover:-translate-y-0.5"
          >
            Get Your Free Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
