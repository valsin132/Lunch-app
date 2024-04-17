import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar';

export function MainContent() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}
