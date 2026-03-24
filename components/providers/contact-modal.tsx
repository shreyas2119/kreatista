"use client";

import React, { createContext, useContext, useState } from "react";
import { ContactFormModal } from "@/components/ui/contact-form-modal";

const ContactModalContext = createContext<{ open: () => void }>({ open: () => {} });

export function useContactModal() {
  return useContext(ContactModalContext);
}

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ContactModalContext.Provider value={{ open: () => setIsOpen(true) }}>
      {children}
      <ContactFormModal open={isOpen} onOpenChange={setIsOpen} />
    </ContactModalContext.Provider>
  );
}
