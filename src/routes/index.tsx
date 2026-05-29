import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ScanFace,
  Shirt,
  Glasses,
  Watch,
  Sparkles,
  ShoppingBag,
  ArrowUpRight,
} from "lucide-react";
import heroImg from "@/assets/hero-avatar.jpg";
import { Nav } from "@/components/Nav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mestra — AI Virtual Try-On & Fashion Universe" },
      {
        name: "description",
        content:
          "Mestra is a futuristic AI fashion platform. Generate your digital avatar, try on clothes, watches, and accessories in real time.",
      },
      { property: "og:title", content: "Mestra — AI Virtual Try-On" },
      { property: "og:description", content: "Step into the AI fashion universe." },
    ],
  }),
  component: Home,
});

const features = [
  { icon: ScanFace, title: "AI Avatar Generation", desc: "Hyper-realistic avatars built from a single selfie via neural reconstruction." },
  { icon: Shirt, title: "Real-Time Try-On", desc: "Drape any garment over your body with sub-pixel mapping and physics-aware draping." },
  { icon: Glasses, title: "Accessory Engine", desc: "Glasses, watches, jewelry — rendered with optical realism, including reflections." },
  { icon: Sparkles, title: "AI Stylist", desc: "A personal stylist trained on millions of looks. Get outfit suggestions in seconds." },
  { icon: Watch, title: "3D / AR Preview", desc: "Spin every product in 360°. Place it in your room with AR — no app install required." },
  { icon: ShoppingBag, title: "Integrated Commerce", desc: "Checkout inside the experience. Wishlist, wardrobe, and one-tap purchase." },
];

function Home() {
  return (
    <div className="min-h-screen text-foreground">
      <Nav />

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="absolute inset-0 grid-bg" aria-hidden />
        <div className="absolute left-1/2 top-1/4 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" aria-hidden />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              MESTRA · NEURAL FASHION ENGINE v2.4
            </div>

            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              The Future of <br />
              <span className="text-gradient">AI Fashion.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Build your digital avatar, try outfits instantly, and step into an
              immersive AI-powered fashion universe — where every garment, watch,
              and accessory becomes a click away.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/studio"
                className="group inline-flex items-center gap-2 rounded-xl bg-[var(--gradient-aurora)] px-6 py-3.5 text-sm font-semibold text-primary-foreground glow-cyan transition hover:scale-[1.03]"
              >
                Launch Studio
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary/60 hover:bg-card/60"
              >
                Explore Engine
              </a>
            </div>

            <div className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
              {[
                ["12M+", "Looks generated"],
                ["98.4%", "Drape accuracy"],
                ["0.4s", "Avg render time"],
              ].map(([k, v]) => (
                <div key={v}>
                  <div className="font-display text-2xl font-bold text-foreground">{k}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-3xl border border-border glass scanline glow-magenta">
              <img
                src={heroImg}
                alt="AI generated holographic fashion avatar"
                className="h-full w-full object-cover"
                width={1080}
                height={1440}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute left-4 top-4 rounded-md border border-primary/40 bg-background/60 px-2 py-1 font-mono text-[10px] tracking-widest text-primary backdrop-blur">
                SCAN · ACTIVE
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-border bg-background/70 px-3 py-2 backdrop-blur">
                <div>
                  <div className="font-mono text-[10px] text-muted-foreground">GARMENT_ID</div>
                  <div className="text-sm font-semibold">Iridescent Trench · S/S26</div>
                </div>
                <span className="font-display text-primary">●</span>
              </div>
            </div>

            {/* floating chips */}
            <div className="absolute -right-6 top-10 hidden rounded-2xl border border-border glass px-4 py-3 float-slow md:block">
              <div className="font-mono text-[10px] text-muted-foreground">POSE</div>
              <div className="font-display text-sm">17 keypoints locked</div>
            </div>
            <div className="absolute -left-6 bottom-16 hidden rounded-2xl border border-border glass px-4 py-3 float-slow md:block" style={{ animationDelay: "1.5s" }}>
              <div className="font-mono text-[10px] text-muted-foreground">FIT</div>
              <div className="font-display text-sm text-primary">99.2% match</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 max-w-2xl">
            <div className="font-mono text-xs uppercase tracking-widest text-primary">// Capabilities</div>
            <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
              An entire fashion lab,<br />
              <span className="text-gradient">inside your browser.</span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <article
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-6 backdrop-blur transition hover:border-primary/50 hover:bg-card/70"
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--gradient-aurora)] text-primary-foreground glow-cyan">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                <span className="absolute right-5 top-5 font-mono text-xs text-muted-foreground/60">
                  0{i + 1}
                </span>
                <div className="pointer-events-none absolute -bottom-px left-0 h-px w-0 bg-[var(--gradient-aurora)] transition-all duration-500 group-hover:w-full" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ENGINE STRIP */}
      <section id="engine" className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="overflow-hidden rounded-3xl border border-border glass p-10 sm:p-16">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-accent">// The Engine</div>
                <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
                  Trained on millions of garments. <br />
                  <span className="text-gradient">Tuned for you.</span>
                </h2>
                <p className="mt-4 max-w-2xl text-muted-foreground">
                  Mestra fuses pose estimation, body segmentation, and diffusion-based
                  garment warping into a single real-time pipeline. Upload a photo,
                  pick a piece, and watch it become yours.
                </p>
              </div>
              <Link
                to="/studio"
                className="inline-flex items-center gap-2 self-start rounded-xl bg-[var(--gradient-aurora)] px-6 py-3.5 text-sm font-semibold text-primary-foreground glow-cyan transition hover:scale-[1.03]"
              >
                Enter the Studio <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-[var(--gradient-aurora)]">
              <Sparkles className="h-3 w-3 text-primary-foreground" />
            </span>
            <span className="font-display font-semibold text-foreground">MESTRA</span>
            <span className="font-mono text-xs">© 2026</span>
          </div>
          <div className="font-mono text-xs">Built for the next decade of fashion.</div>
        </div>
      </footer>
    </div>
  );
}
