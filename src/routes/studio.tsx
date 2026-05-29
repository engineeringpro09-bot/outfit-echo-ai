import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { UploadCloud, Sparkles, RotateCcw, Wand2, User, Shirt } from "lucide-react";
import { Nav } from "@/components/Nav";
import { useServerFn } from "@tanstack/react-start";
import { generateTryOn } from "@/lib/tryon.functions";
import { toast } from "sonner";

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Mestra Studio — AI Virtual Try-On" },
      { name: "description", content: "Upload your photo and a garment to generate an AI virtual try-on inside Mestra Studio." },
      { property: "og:title", content: "Mestra Studio" },
      { property: "og:description", content: "Generate AI virtual try-ons in real time." },
    ],
  }),
  component: Studio,
});

type Slot = "user" | "cloth";

function Studio() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [clothImage, setClothImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "scanning" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const tryOn = useServerFn(generateTryOn);

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>, slot: Slot) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await fileToDataUrl(file);
    if (slot === "user") setUserImage(url);
    else setClothImage(url);
    setStatus("idle");
    setProgress(0);
    setResultImage(null);
  };

  const generate = async () => {
    if (!userImage || !clothImage) return;
    setStatus("scanning");
    setProgress(0);
    setResultImage(null);
    const id = setInterval(() => {
      setProgress((p) => (p < 92 ? p + 2 : p));
    }, 200);
    try {
      const { image } = await tryOn({ data: { userImage, garmentImage: clothImage } });
      setResultImage(image);
      setProgress(100);
      setStatus("done");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Generation failed";
      toast.error(msg);
      setStatus("idle");
      setProgress(0);
    } finally {
      clearInterval(id);
    }
  };

  const reset = () => {
    setUserImage(null);
    setClothImage(null);
    setResultImage(null);
    setStatus("idle");
    setProgress(0);
  };

  return (
    <div className="min-h-screen text-foreground">
      <Nav />

      <main className="relative mx-auto max-w-7xl px-6 pt-32 pb-20">
        <div className="absolute inset-x-0 top-20 -z-10 grid-bg h-[500px]" aria-hidden />

        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-primary">// Mestra Studio</div>
            <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
              AI <span className="text-gradient">Virtual Try-On</span>
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Drop a photo of yourself and a fashion item. The Mestra engine maps your
              body, warps the garment, and renders a photorealistic preview.
            </p>
          </div>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 px-4 py-2 text-sm text-muted-foreground transition hover:border-primary/50 hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1.2fr]">
          <UploadCard
            label="Your Photo"
            hint="JPG or PNG · full body works best"
            icon={<User className="h-5 w-5" />}
            preview={userImage}
            onPick={(e) => onPick(e, "user")}
          />
          <UploadCard
            label="Fashion Item"
            hint="Clothing, accessory, jewelry…"
            icon={<Shirt className="h-5 w-5" />}
            preview={clothImage}
            onPick={(e) => onPick(e, "cloth")}
            tone="magenta"
          />

          {/* Result panel */}
          <div className="relative overflow-hidden rounded-2xl border border-border glass">
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Generated Try-On
                </span>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">
                {status === "scanning" ? `MAPPING ${progress}%` : status === "done" ? "RENDER · OK" : "AWAITING INPUT"}
              </span>
            </div>

            <div className="relative grid aspect-[3/4] place-items-center bg-background/40">
              {!userImage && !clothImage && (
                <div className="px-6 text-center text-muted-foreground">
                  <Sparkles className="mx-auto mb-3 h-8 w-8 text-primary" />
                  <p className="text-sm">Upload a photo and a garment to begin.</p>
                </div>
              )}

              {userImage && status !== "done" && (
                <img
                  src={userImage}
                  alt="You"
                  className={`absolute inset-0 h-full w-full object-cover transition duration-700 ${
                    status === "scanning" ? "saturate-0 opacity-80" : "opacity-90"
                  }`}
                />
              )}

              {resultImage && status === "done" && (
                <img
                  src={resultImage}
                  alt="AI try-on result"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}

              {status === "scanning" && (
                <>
                  <div className="absolute inset-x-0 top-0 h-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/30 to-transparent" style={{ transform: `translateY(${progress - 100}%)` }} />
                  </div>
                  <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
                </>
              )}

              {status === "done" && (
                <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-primary/40 bg-background/70 px-3 py-2 backdrop-blur">
                  <div>
                    <div className="font-mono text-[10px] text-muted-foreground">MESTRA RENDER</div>
                    <div className="text-sm font-semibold">Fit · 98.7% · Style match · A+</div>
                  </div>
                  <span className="text-primary">●</span>
                </div>
              )}
            </div>

            <div className="border-t border-border p-4">
              <button
                onClick={generate}
                disabled={!userImage || !clothImage || status === "scanning"}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--gradient-aurora)] px-6 py-3.5 text-sm font-semibold text-primary-foreground glow-cyan transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40 disabled:saturate-50"
              >
                <Wand2 className="h-4 w-4" />
                {status === "scanning" ? "Generating…" : status === "done" ? "Regenerate Look" : "Generate Try-On"}
              </button>
              <p className="mt-3 text-center font-mono text-[10px] text-muted-foreground">
                Powered by Gemini 2.5 Flash Image · real AI garment transfer.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function UploadCard({
  label,
  hint,
  icon,
  preview,
  onPick,
  tone = "cyan",
}: {
  label: string;
  hint: string;
  icon: React.ReactNode;
  preview: string | null;
  onPick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tone?: "cyan" | "magenta";
}) {
  const ref = useRef<HTMLInputElement>(null);
  const glow = tone === "cyan" ? "glow-cyan" : "glow-magenta";
  const ring = tone === "cyan" ? "hover:border-primary/60" : "hover:border-accent/60";

  return (
    <div className="rounded-2xl border border-border glass overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-2">
          <span className={`grid h-7 w-7 place-items-center rounded-lg bg-[var(--gradient-aurora)] ${glow}`}>
            {icon}
          </span>
          <span className="font-display text-sm font-semibold">{label}</span>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground">{preview ? "READY" : "EMPTY"}</span>
      </div>

      <button
        type="button"
        onClick={() => ref.current?.click()}
        className={`group relative grid aspect-[3/4] w-full place-items-center overflow-hidden bg-background/40 transition ${ring}`}
      >
        {preview ? (
          <img src={preview} alt={label} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="px-6 text-center">
            <UploadCloud className="mx-auto mb-3 h-8 w-8 text-muted-foreground transition group-hover:text-primary" />
            <div className="text-sm font-medium">Click to upload</div>
            <div className="mt-1 text-xs text-muted-foreground">{hint}</div>
          </div>
        )}
        <input
          ref={ref}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onPick}
        />
      </button>
    </div>
  );
}
