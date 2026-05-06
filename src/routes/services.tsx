import { createFileRoute, Link } from "@tanstack/react-router";
import { Scissors, Sprout, TreePine, Leaf, Flower2, Snowflake, ArrowRight } from "lucide-react";
import lawnImg from "@/assets/service-lawn.jpg";
import hedgesImg from "@/assets/service-hedges.jpg";
import designImg from "@/assets/service-design.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Gentleman's Outdoor Services" },
      { name: "description", content: "Edging, cleanups, hedge trimming, garden design, mulching, and seasonal landscaping services." },
      { property: "og:title", content: "Our Services — Gentleman's Outdoor Services" },
      { property: "og:description", content: "Refined landscaping services: edging, cleanups, hedges, garden design, and more." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { Icon: Scissors, img: lawnImg, t: "Lawn Care & Edging", d: "Crisp edging, weed control, and meticulous tidying — we sharpen the lines that make a yard look truly cared for. (We don't mow.)" },
  { Icon: TreePine, img: hedgesImg, t: "Hedge & Shrub Trimming", d: "Precision hand-shaping for boxwoods, hollies, and ornamental shrubs that hold their form season after season." },
  { Icon: Sprout, img: designImg, t: "Garden Design & Beds", d: "Thoughtful bed shaping, perennial layouts, and hardscape touches that elevate the entire property." },
  { Icon: Leaf, img: hedgesImg, t: "Seasonal Cleanups", d: "Spring wake-ups and fall leaf removal — bed by bed, corner by corner, until everything is just right." },
  { Icon: Flower2, img: designImg, t: "Mulching & Planting", d: "Premium hardwood mulch, fresh annuals, and seasonal color refreshes that make a property pop." },
  { Icon: Snowflake, img: lawnImg, t: "Snow & Ice Care", d: "Reliable winter clearing for walkways, drives, and entry steps so your property stays welcoming." },
];

function ServicesPage() {
  return (
    <>
      <section className="bg-[var(--cream)] border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <span className="text-xs uppercase tracking-[0.25em] text-[var(--accent)]">Our craft</span>
          <h1 className="mt-3 max-w-3xl font-serif text-5xl font-semibold text-foreground md:text-6xl">
            Landscaping done the gentleman's way.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            We focus on the details that make a property look distinguished — edging, cleanups, hedges, beds, and seasonal care.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ Icon, img, t, d }) => (
            <article key={t} className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
              <div className="relative h-48 overflow-hidden">
                <img src={img} alt={t} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
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

        <div className="mt-16 text-center">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] transition-transform hover:-translate-y-0.5">
            Request a Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
