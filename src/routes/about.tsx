import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Heart, Handshake, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-lawn.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Gentleman's Outdoor Services" },
      { name: "description", content: "A family-owned landscaping company built on craftsmanship, courtesy, and care." },
      { property: "og:title", content: "About Gentleman's Outdoor Services" },
      { property: "og:description", content: "Built on craftsmanship, courtesy, and care." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src={heroImg} alt="Manicured estate lawn" width={1920} height={1280} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="relative mx-auto max-w-7xl px-6 py-28 text-[var(--cream)]">
          <span className="text-xs uppercase tracking-[0.25em] text-[var(--gold)]">Our story</span>
          <h1 className="mt-3 max-w-3xl font-serif text-5xl font-semibold md:text-6xl">
            Old-fashioned care for the modern yard.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="font-serif text-2xl leading-relaxed text-foreground md:text-3xl">
          Gentleman's Outdoor Services was founded on a simple idea: a well-kept property is a small act of pride.
        </p>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          We're a family-run team that treats every yard like it's our own. From the first walk-through to the
          final cleanup, we listen carefully, work cleanly, and leave the place better than we found it. No
          rushed crews, no half-finished edges — just steady, reliable craftsmanship.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          We believe that being a gentleman is less about what you wear and more about how you show up. Punctual.
          Polite. Particular about the work. That's the standard we hold ourselves to on every property, every visit.
        </p>
      </section>

      <section className="bg-[var(--cream)] border-y border-border/60">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-20 md:grid-cols-3">
          {[
            { Icon: Award, t: "Craftsmanship", d: "We take pride in clean lines, sharp edges, and a finished look." },
            { Icon: Heart, t: "Care", d: "Your property is treated with the same respect as our own home." },
            { Icon: Handshake, t: "Honor", d: "Honest pricing, kept promises, and showing up when we say we will." },
          ].map(({ Icon, t, d }) => (
            <div key={t}>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-serif text-2xl text-foreground">{t}</h3>
              <p className="mt-2 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h2 className="font-serif text-4xl font-semibold text-foreground">Let's tend to your property.</h2>
        <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] transition-transform hover:-translate-y-0.5">
          Get in Touch <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </>
  );
}
