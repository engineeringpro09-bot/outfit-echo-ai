import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const generateTryOn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      userImage: z.string().min(20), // data URL
      garmentImage: z.string().min(20),
    }),
  )
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY missing");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        modalities: ["image", "text"],
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Image 1 is a person. Image 2 is a clothing item. Generate a single photorealistic image of the SAME person from Image 1 wearing the clothing item from Image 2. Preserve the person's face, identity, pose, background, lighting, and skin tone exactly. Replace only their upper-body garment with the item from Image 2, fitting it naturally to their body with realistic folds, shadows, and proportions. Output only the final image.",
              },
              { type: "image_url", image_url: { url: data.userImage } },
              { type: "image_url", image_url: { url: data.garmentImage } },
            ],
          },
        ],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      if (res.status === 429) throw new Error("Rate limit exceeded. Please try again shortly.");
      if (res.status === 402) throw new Error("AI credits exhausted. Add credits in Settings → Workspace.");
      throw new Error(`Try-on failed (${res.status}): ${text.slice(0, 200)}`);
    }

    const json = await res.json();
    const image: string | undefined =
      json?.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    if (!image) throw new Error("No image returned from model");
    return { image };
  });
