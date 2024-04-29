import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface AuthContextType {
  isLogged: boolean;
  login: () => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLogged, setIsLogged] = useState(false);

  const login = () => {
    setIsLogged(true);
  };

  const logout = () => {
    setIsLogged(false);
  };

  const authContextValue = useMemo(() => ({ isLogged, login, logout }), [isLogged]);

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}
