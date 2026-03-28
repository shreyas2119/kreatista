"use client";

import React, { createContext, useContext, useState } from "react";
import { CalendlyModal } from "@/components/ui/calendly-modal";
import { ContactFormModal } from "@/components/ui/contact-form-modal";

interface ContactModalContextType {
  openCalendly: (subject?: string) => void;
  openContactForm: (subject?: string) => void;
}

const ContactModalContext = createContext<ContactModalContextType>({ 
  openCalendly: () => {},
  openContactForm: () => {}
});

export function useContactModal() {
  return useContext(ContactModalContext);
}

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [subject, setSubject] = useState<string | undefined>();

  const openCalendly = (s?: string) => {
    setSubject(s);
    setIsCalendlyOpen(true);
  };

  const openContactForm = (s?: string) => {
    setSubject(s);
    setIsContactFormOpen(true);
  };

  return (
    <ContactModalContext.Provider value={{ openCalendly, openContactForm }}>
      {children}
      <CalendlyModal open={isCalendlyOpen} onOpenChange={setIsCalendlyOpen} initialSubject={subject} />
      <ContactFormModal open={isContactFormOpen} onOpenChange={setIsContactFormOpen} initialSubject={subject} />
    </ContactModalContext.Provider>
  );
}
