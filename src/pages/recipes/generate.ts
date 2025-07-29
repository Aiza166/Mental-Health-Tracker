import { supabase } from "@/lib/supabaseClient";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) return res.status(401).json({ error: "Unauthorized" });

  try {
    // Call n8n webhook for AI generation
    const n8nRes = await fetch(process.env.N8N_RECIPE_WEBHOOK!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const recipe = await n8nRes.json();

    // Save to Supabase
    const { error } = await supabase.from("recipes").insert({
      user_email: session.user.email,
      title: recipe.title,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
    });

    if (error) throw error;
    return res.status(200).json(recipe);
  } catch (err) {
    console.error("Recipe generation error:", err);
    return res.status(500).json({ error: "Failed to generate recipe" });
  }
}
