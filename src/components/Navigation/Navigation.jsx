import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';
import clsx from 'clsx';

const Navigation = () => {
  const activeLink = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };
  return (
    <nav className={s.container}>
      <NavLink className={activeLink} to="/">
        Home
      </NavLink>
      <NavLink className={activeLink} to="/movies">
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
