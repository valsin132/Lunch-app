import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface AuthContextType {
  isLogged: boolean;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const isUserLogged = () => {
    const user = localStorage.getItem('userData');
    return !!user;
  };

  const [isLogged, setIsLogged] = useState(isUserLogged());

  const handleStorageChange = () => {
    setIsLogged(isUserLogged());
  };

  window.addEventListener('storage', handleStorageChange);

  const logout = () => {
    localStorage.removeItem('userData');
    window.dispatchEvent(new Event('storage'));
  };

  const authContextValue = useMemo(() => ({ isLogged, logout }), [isLogged]);

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}
