"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface GuestModeContextType {
  isGuestMode: boolean;
  enableGuestMode: () => void;
  disableGuestMode: () => void;
}

const GuestModeContext = createContext<GuestModeContextType | undefined>(undefined);

export function GuestModeProvider({ children }: { children: React.ReactNode }) {
  const [isGuestMode, setIsGuestMode] = useState(false);

  // Check if guest mode is enabled from localStorage on mount
  useEffect(() => {
    const storedGuestMode = localStorage.getItem('guestMode');
    if (storedGuestMode === 'true') {
      setIsGuestMode(true);
    }
  }, []);

  const enableGuestMode = () => {
    localStorage.setItem('guestMode', 'true');
    setIsGuestMode(true);
  };

  const disableGuestMode = () => {
    localStorage.removeItem('guestMode');
    setIsGuestMode(false);
  };

  return (
    <GuestModeContext.Provider value={{ isGuestMode, enableGuestMode, disableGuestMode }}>
      {children}
    </GuestModeContext.Provider>
  );
}

export function useGuestMode() {
  const context = useContext(GuestModeContext);
  if (context === undefined) {
    throw new Error('useGuestMode must be used within a GuestModeProvider');
  }
  return context;
} 