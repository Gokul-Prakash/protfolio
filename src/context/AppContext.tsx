import { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextValue {
  isMenuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <AppContext.Provider value={{ isMenuOpen, setMenuOpen }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextValue => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
