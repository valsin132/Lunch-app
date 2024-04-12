import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ProtectedRoute } from '../../components/ProtectedRoute/ProtectedRoute';

export function MainContent() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('mount');
    const timeout = setTimeout(() => {
      setIsLoggedIn(false);
    }, 10000);
    return () => {
      // eslint-disable-next-line no-console
      console.log('dismount');
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
