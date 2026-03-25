"use client";

import React, { createContext, useContext, useState } from "react";
import { ContactFormModal } from "@/components/ui/contact-form-modal";

interface ContactModalContextType {
  open: (subject?: string) => void;
}

const ContactModalContext = createContext<ContactModalContextType>({ open: () => {} });

export function useContactModal() {
  return useContext(ContactModalContext);
}

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState<string | undefined>();

  const open = (s?: string) => {
    setSubject(s);
    setIsOpen(true);
  };

  return (
    <ContactModalContext.Provider value={{ open }}>
      {children}
      <ContactFormModal open={isOpen} onOpenChange={setIsOpen} initialSubject={subject} />
    </ContactModalContext.Provider>
  );
}
