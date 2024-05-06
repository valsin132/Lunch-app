import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';

interface AuthContextType {
  isLogged: boolean;
  login: () => void;
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

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLogged(isUserLogged());
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = () => {
    setIsLogged(true);
  };

  const logout = () => {
    setIsLogged(false);
    localStorage.removeItem('userData');
  };

  const authContextValue = useMemo(() => ({ isLogged, login, logout }), [isLogged]);

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}
