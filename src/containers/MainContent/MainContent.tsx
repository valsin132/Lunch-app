import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ProtectedRoute } from '../../components/ProtectedRoute/ProtectedRoute';

export function MainContent() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoggedIn(false);
    }, 10000);
    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <ProtectedRoute isLoggedIn={isLoggedIn}>
      <main>
        <Outlet />
      </main>
    </ProtectedRoute>
  );
}
