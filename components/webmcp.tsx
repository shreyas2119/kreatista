"use client";
import { useEffect } from "react";

export function WebMCP() {
  useEffect(() => {
    const tools = [
      {
        name: "search_site",
        description: "Search Socioryx site content, services and blog posts",
        inputSchema: {
          type: "object",
          properties: { query: { type: "string", description: "Search query" } },
          required: ["query"],
        },
        execute: async ({ query }: { query: string }) => {
          return `Results for "${query}": See https://socioryx.com/search?q=${encodeURIComponent(query)} and https://socioryx.com/blog`;
        },
      },
      {
        name: "get_services",
        description: "List Socioryx content marketing services",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          return JSON.stringify([
            { name: "Website Design", url: "https://socioryx.com/services/website-design-development" },
            { name: "Brand Marketing", url: "https://socioryx.com/services/brand-marketing-positioning" },
            { name: "Content Creation", url: "https://socioryx.com/services/content-creation-social-media" },
            { name: "Social Media Management", url: "https://socioryx.com/services/social-media-management" },
          ]);
        },
      },
      {
        name: "book_audit",
        description: "Book a free AI marketing audit",
        inputSchema: {
          type: "object",
          properties: {
            email: { type: "string", description: "Contact email" },
            website: { type: "string", description: "Website to audit" },
          },
          required: ["email"],
        },
        execute: async ({ email, website }: { email: string; website?: string }) => {
          return `To book, visit https://socioryx.com/free-ai-marketing-audit with email ${email}${website ? ` and site ${website}` : ""}`;
        },
      },
    ];

    const nav = navigator as unknown as { modelContext?: { provideContext?: (c: unknown) => void; registerTool?: (t: unknown) => void } };
    const mc = nav.modelContext;
    if (!mc) return;

    // Modern API: provideContext, legacy: registerTool per tool
    try {
      if (typeof mc.provideContext === "function") {
        mc.provideContext({ tools });
      } else if (typeof mc.registerTool === "function") {
        tools.forEach((t) => mc.registerTool!(t));
      }
    } catch {
      // ignore
    }
  }, []);
  return null;
}
