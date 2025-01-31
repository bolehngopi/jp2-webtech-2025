import Navbar from './Navbar';
import { Outlet } from 'react-router';

const DefaultLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default DefaultLayout;
