import { Fragment } from 'react';
import './sidebar.css';
import { NavLink } from 'react-router-dom';
import { navlinks } from '../../utility/constants';
// import { useSelector } from 'react-redux';

const backgroundStyle = ({ isActive }) => {
  return isActive ? `sidebar__options selected` : `sidebar__options`;
};

export function Sidebar() {
  // const { savedNotifications } = useSelector((state) => state.user);
  // const badgeSize = savedNotifications?.filter((item) => item.unseen)?.length;
  return (
    <Fragment>
      <div className='sidebar sidefixed'>
        {navlinks.map((elem) => {
          return (
            <NavLink to={elem?.path} key={elem.id} className={backgroundStyle}>
              <i className={elem.class}></i>
              <span className='sidebar__options__span'>{elem.name}</span>
            </NavLink>
          );
        })}
      </div>
    </Fragment>
  );
}
