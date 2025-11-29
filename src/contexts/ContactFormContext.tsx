'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import ContactFormModal from '@/components/ContactFormModal';

interface ContactFormContextType {
  openForm: () => void;
  closeForm: () => void;
  isOpen: boolean;
}

const ContactFormContext = createContext<ContactFormContextType | undefined>(undefined);

export function ContactFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openForm = () => setIsOpen(true);
  const closeForm = () => setIsOpen(false);

  return (
    <ContactFormContext.Provider value={{ openForm, closeForm, isOpen }}>
      {children}
      <ContactFormModal isOpen={isOpen} onClose={closeForm} />
    </ContactFormContext.Provider>
  );
}

export function useContactForm() {
  const context = useContext(ContactFormContext);
  if (context === undefined) {
    throw new Error('useContactForm must be used within a ContactFormProvider');
  }
  return context;
}

