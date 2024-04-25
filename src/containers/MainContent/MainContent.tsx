import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { UserCard } from '../../components/UserCard';

export function MainContent() {
  // TEST data for local storage it will be delted before merge
  useEffect(() => {
    fetch('http://localhost:3002/user')
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('userData', JSON.stringify(data));
      })
      .catch((error) => {
        throw new Error(`An error occurred while fetching user data: ${error}`);
      });
  }, []);

  return (
    <>
      <Sidebar />
      <UserCard />
      <Outlet />
    </>
  );
}
