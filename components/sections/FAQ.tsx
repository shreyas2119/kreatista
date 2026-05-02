"use client";

import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useContactModal } from "@/components/providers/contact-modal";

const faqs = [
  {
    id: "item-1",
    question: "What is Socioryx and what do you do?",
    answer:
      "Socioryx is a full-stack content marketing agency based in India. We help D2C brands, SaaS startups, and creators grow online through six core services: website design and development, brand marketing and positioning, content creation, social media management, influencer collaborations, and video production — all under one roof.",
  },
  {
    id: "item-2",
    question: "What services does Socioryx offer?",
    answer:
      "We offer six services: conversion-focused website design and development, brand marketing and positioning strategy, content creation for social media, end-to-end social media management, influencer marketing campaigns, and video production. You can hire us for one service or let us handle everything together.",
  },
  {
    id: "item-3",
    question: "How can I contact Socioryx or get started?",
    answer:
      "You can reach us at work@socioryx.com or fill the contact form on our services page. We also offer a free strategy call — click 'Let's Talk' anywhere on the site to book a time directly on our calendar. We respond to all enquiries within 24 hours.",
  },
  {
    id: "item-4",
    question: "What does a content marketing agency do?",
    answer:
      "A content marketing agency handles the creation, distribution, and strategy behind your brand's content — including social media posts, videos, blog articles, and influencer campaigns. Socioryx manages all of this under one roof so your messaging stays consistent across every platform.",
  },
  {
    id: "item-5",
    question: "How much does social media management cost in India?",
    answer:
      "Social media management pricing in India varies based on the number of platforms, posting frequency, and whether content creation is included. Socioryx offers end-to-end packages that cover strategy, creation, and posting. Contact us for a custom quote based on your brand's needs.",
  },
  {
    id: "item-6",
    question: "Which is better for D2C brands — Instagram or YouTube?",
    answer:
      "Both serve different purposes. Instagram drives discovery and daily engagement through Reels and Stories. YouTube builds long-term authority and search traffic. Most D2C brands benefit from starting with Instagram and adding YouTube once they have consistent content production. Socioryx helps you decide based on your category and audience.",
  },
  {
    id: "item-7",
    question: "Do you work with early-stage startups or only established brands?",
    answer:
      "We work with brands at all stages — from founders building their first digital presence to established D2C brands scaling their content operations. Our approach adapts to your budget and growth stage.",
  },
  {
    id: "item-8",
    question: "How long does it take to see results from content marketing?",
    answer:
      "Organic content and SEO typically show measurable results in 3 to 6 months. Short-form video on Instagram and YouTube Shorts can generate traction within 30 to 60 days with consistent posting. Paid campaigns can drive results faster. We set realistic timelines based on your goals during the strategy call.",
  },
  {
    id: "item-9",
    question: "Can Socioryx handle everything or do we need to be involved?",
    answer:
      "We handle everything — strategy, content creation, posting, and reporting. Your involvement is as much or as little as you want. Most clients do a monthly check-in call to review performance and align on upcoming campaigns.",
  },
];

export default function FAQ() {
  const { openContactForm } = useContactModal();

  return (
    <section className="py-20 sm:py-32 px-5 sm:px-8 lg:px-16 bg-[#13131a]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16">

          {/* Left — heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-3 font-body">FAQ</p>
            <h2 className="text-4xl sm:text-5xl font-semibold text-[#F8F8FF] tracking-[-0.03em] leading-tight mb-4 font-heading">
              Frequently Asked Questions
            </h2>
            <p className="text-[#B8C5D6]/50 text-sm leading-relaxed font-body mb-8">
              Quick answers to what most brands ask before working with us.
            </p>
            <button
              onClick={() => openContactForm()}
              className="text-sm font-medium text-[#B8C5D6]/60 hover:text-[#E5E4E2] transition-colors font-body underline underline-offset-4 decoration-[#B8C5D6]/20 hover:decoration-[#E5E4E2]/40"
            >
              Still have questions? Contact us
            </button>
          </motion.div>

          {/* Right — accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-3"
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-base font-body font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
