import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar';
import { UserCard } from '../../components/UserCard';

export function MainContent() {
  return (
    <>
      <Sidebar />
      <Outlet />
      <header>
        <UserCard toggleOrderSummary={() => alert('close order summary')} />
      </header>
    </>
  );
}
