import { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <nav
      className='navbar navbar-expand-lg'
      style={{ backgroundColor: '#e3f2fd' }}>
      <div className='container'>
        <Link className='navbar-brand' to={'/'}>
          <i className='fa-solid fa-notes-medical fa-lg'></i> e-Doc
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <NavLink className='nav-link' aria-current='page' to={'/'}>
                <i className='fa-solid fa-xs fa-house'></i> Home
              </NavLink>
            </li>
            {auth && (
              <>
                <li className='nav-item'>
                  <NavLink className='nav-link' to={'/schedule'}>
                    <i className='fa-solid fa-xs fa-calendar-days'></i> Schedules
                  </NavLink>
                </li>
                <li className='nav-item dropdown'>
                  <NavLink
                    className='nav-link dropdown-toggle'
                    href='#'
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'>
                    <i className='fa-solid fa-xs fa-rectangle-list'></i> Referensi
                  </NavLink>
                  <ul className='dropdown-menu'>
                    <li>
                      <NavLink className='dropdown-item' to={'/doctor'}>
                        <i className='fa-solid fa-xs fa-user-doctor'></i> Doctors
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className='dropdown-item' to={'/department'}>
                        <i className='fa-solid fa-xs fa-building'></i> Departments
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
          <span className='navbar-text'>
            {auth ? (
              <NavLink
                className='nav-link'
                aria-current='page'
                onClick={() => logout()}>
                <i className='fa-solid fa-xs fa-sign-out'></i> Logout
              </NavLink>
            ) : (
              <NavLink className='nav-link' aria-current='page' to={'/login'}>
                <i className='fa-solid fa-xs fa-sign-out'></i> Login
              </NavLink>
            )}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
