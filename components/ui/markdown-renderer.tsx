"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import type { Components } from "react-markdown";

const components: Components = {
  // H2 — primary section heading, clean, no decoration
  h2: ({ children }) => (
    <h2 className="text-2xl sm:text-[28px] font-bold text-[#F8F8FF] tracking-[-0.01em] mt-14 mb-4 leading-snug" style={{ fontFamily: "var(--font-blog-body)" }}>
      {children}
    </h2>
  ),

  // H3 — subsection
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold text-[#E5E4E2]/90 mt-10 mb-3 leading-snug" style={{ fontFamily: "var(--font-blog-body)" }}>
      {children}
    </h3>
  ),

  // H4 — label-style
  h4: ({ children }) => (
    <h4 className="text-[13px] font-bold text-[#B8C5D6]/50 mt-8 mb-2 uppercase tracking-[0.14em]" style={{ fontFamily: "var(--font-blog-ui, var(--font-body))" }}>
      {children}
    </h4>
  ),

  // Paragraph
  p: ({ children, node }) => {
    const childArray = Array.isArray(children) ? children : [children];
    const hasOnlyImage =
      childArray.length === 1 &&
      node?.children?.length === 1 &&
      node.children[0].type === "element" &&
      (node.children[0] as { tagName?: string }).tagName === "img";

    if (hasOnlyImage) return <>{children}</>;

    return (
      <p className="text-[19px] text-[#B8C5D6]/75 leading-[1.85] mb-7" style={{ fontFamily: "var(--font-blog-body)" }}>
        {children}
      </p>
    );
  },

  // Image — full-width with caption
  img: ({ src, alt }) => (
    <figure className="my-12 -mx-4 sm:-mx-8">
      <div className="overflow-hidden rounded-xl bg-[#1a1f26] shadow-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src ?? ""} alt={alt ?? ""} className="w-full h-auto object-cover" loading="lazy" />
      </div>
      {alt && (
        <figcaption className="text-center text-xs text-[#B8C5D6]/30 mt-3 font-body italic">
          {alt}
        </figcaption>
      )}
    </figure>
  ),

  // Links
  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-[#E5E4E2] underline underline-offset-[3px] decoration-[#E5E4E2]/30 hover:decoration-[#E5E4E2]/70 transition-all duration-150"
    >
      {children}
    </a>
  ),

  // Lists
  ul: ({ children }) => <ul className="mb-7 space-y-2 pl-0 list-none">{children}</ul>,
  ol: ({ children }) => (
    <ol className="mb-7 space-y-2 pl-6 list-decimal marker:text-[#E5E4E2]/30 marker:font-medium">
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => {
    const isOrdered = (props as { ordered?: boolean }).ordered;
    if (isOrdered) {
      return <li className="text-[19px] text-[#B8C5D6]/75 leading-relaxed pl-1" style={{ fontFamily: "var(--font-blog-body)" }}>{children}</li>;
    }
    return (
      <li className="flex gap-3 text-[19px] text-[#B8C5D6]/75 leading-relaxed" style={{ fontFamily: "var(--font-blog-body)" }}>
        <span className="mt-[0.75em] w-1.5 h-1.5 rounded-full bg-[#E5E4E2]/35 flex-shrink-0" />
        <span>{children}</span>
      </li>
    );
  },

  // Blockquote — Medium style: large, centered, italic
  blockquote: ({ children }) => (
    <blockquote className="my-12 px-6 sm:px-10 text-center">
      <div className="text-2xl sm:text-3xl italic text-[#F8F8FF]/50 leading-relaxed tracking-[-0.01em]" style={{ fontFamily: "var(--font-blog-body)" }}>
        {children}
      </div>
    </blockquote>
  ),

  // HR — three dots
  hr: () => (
    <div className="my-14 flex items-center justify-center gap-4">
      <span className="w-1.5 h-1.5 rounded-full bg-[#E5E4E2]/20" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#E5E4E2]/20" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#E5E4E2]/20" />
    </div>
  ),

  // Code
  code: ({ children, className }) => {
    if (className?.includes("language-")) {
      return <code className="block text-sm font-mono text-[#B8C5D6]/80 leading-relaxed">{children}</code>;
    }
    return (
      <code className="text-[13px] font-mono bg-[#1a1f26] border border-[#F8F8FF]/[0.08] text-[#E5E4E2] px-1.5 py-0.5 rounded-md">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="my-8 bg-[#0f1419] border border-[#F8F8FF]/[0.06] rounded-xl p-6 overflow-x-auto text-sm leading-relaxed">
      {children}
    </pre>
  ),

  strong: ({ children }) => <strong className="font-semibold text-[#F8F8FF]">{children}</strong>,
  em: ({ children }) => <em className="italic text-[#B8C5D6]/85" style={{ fontFamily: "var(--font-blog-body)" }}>{children}</em>,

  // Table
  table: ({ children }) => (
    <div className="my-10 overflow-x-auto rounded-xl border border-[#F8F8FF]/[0.06]">
      <table className="w-full text-sm text-left">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-[#1a1f26] text-[#E5E4E2] font-semibold font-heading text-xs uppercase tracking-[0.1em]">
      {children}
    </thead>
  ),
  tbody: ({ children }) => <tbody className="divide-y divide-[#F8F8FF]/[0.04]">{children}</tbody>,
  tr: ({ children }) => <tr className="hover:bg-[#F8F8FF]/[0.02] transition-colors">{children}</tr>,
  th: ({ children }) => <th className="px-5 py-3.5">{children}</th>,
  td: ({ children }) => <td className="px-5 py-3.5 text-[#B8C5D6]/70 font-body">{children}</td>,
};

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
