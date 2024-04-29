import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { UserCard } from '../../components/UserCard';

export function MainContent() {
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  const toggleOrderSummary = () => {
    setShowOrderSummary(!showOrderSummary);
  };
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
      <Outlet />
      <header>
        <UserCard toggleOrderSummary={toggleOrderSummary} />
      </header>
      {showOrderSummary && <div>Order Summary</div>}
    </>
  );
}
