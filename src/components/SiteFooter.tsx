import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-[var(--forest)] text-[var(--cream)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--cream)] p-1.5">
              <img src={logo} alt="Gentleman's Outdoor Services" width={48} height={48} className="h-full w-full object-contain" />
            </span>
            <div>
              <div className="font-serif text-lg">Gentleman's Outdoor</div>
              <div className="text-[10px] uppercase tracking-[0.2em] opacity-70">Your Yard, Our Honor</div>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm opacity-75">
            Refined landscaping and lawn care delivered with old-fashioned craftsmanship.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-85">
            <li><Link to="/services" className="hover:text-[var(--gold)]">Services</Link></li>
            <li><Link to="/about" className="hover:text-[var(--gold)]">About</Link></li>
            <li><Link to="/contact" className="hover:text-[var(--gold)]">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Get in touch</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-85">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /><span>(734) 679-9573</span></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /><span>gentlemansoutdoorservices@gmail.com</span></li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /><span>Serving Livingston County</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs opacity-60">
        © {new Date().getFullYear()} Gentleman's Outdoor Services. All rights reserved.
      </div>
    </footer>
  );
}
