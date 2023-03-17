/* eslint-disable react/prop-types */
import React from 'react';

import { checkAccess } from '@database/helper';
import { useNanoUser } from '@database/hooks/nano-hooks';
import { Link, useRouteMatch } from 'react-router-dom';
import usePromise from 'react-use-promise';
import Routes from '../../routes';

const Sidebar = () => {
  const user = useNanoUser();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [result, error, state] = usePromise(user.session(), []);

  if (state !== 'resolved') {
    return <p className="page-sidebar bg-white b-grey b-r" />;
  }

  const NavItem = ({ route }) => {
    const active = useRouteMatch(route.path);
    // const permissions = useSelector((state: RootState) => state.user.permissions);
    const hidden = checkAccess(result?.userCtx.roles, route.roles)
      ? ''
      : 'hidden';

    return (
      <li className={`${active} ${hidden}`}>
        <Link to={route.path} className="detailed navigation">
          <span className="title">{route.title}</span>
          <span className="details">No new updates</span>
        </Link>
        <span className="icon-thumbnail">
          <i className="pg-icon">{route.icon}</i>
        </span>
      </li>
    );
  };

  return (
    <nav className="page-sidebar bg-white b-grey b-r" data-pages="sidebar">
      <div className="sidebar-overlay-slide from-top" id="appMenu">
        <div className="row">
          <div className="col-xs-6 no-padding">
            <a href="/" className="p-l-40">
              <img src="./menrva/assets/img/demo/social_app.svg" alt="socail" />
            </a>
          </div>
          <div className="col-xs-6 no-padding">
            <a href="/" className="p-l-10">
              <img src="./menrva/assets/img/demo/email_app.svg" alt="socail" />
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6 m-t-20 no-padding">
            <a href="/" className="p-l-40">
              <img
                src="./menrva/assets/img/demo/calendar_app.svg"
                alt="socail"
              />
            </a>
          </div>
          <div className="col-xs-6 m-t-20 no-padding">
            <a href="/" className="p-l-10">
              <img src="./menrva/assets/img/demo/add_more.svg" alt="socail" />
            </a>
          </div>
        </div>
      </div>
      <div className="sidebar-header bg-light border-0 d-flex">
        <div className="brand inline py-1">
          <h4 className="text-black no-padding font-montserrat bold p-r-5">
            Menrva <span className="text-success">+</span>
          </h4>
        </div>
        <div className="sidebar-header-controls inline">
          <button
            aria-label="Toggle Drawer"
            type="button"
            className="btn btn-icon-link invert sidebar-slide-toggle m-l-20 m-r-15"
            data-pages-toggle="/appMenu"
          >
            <i className="pg-icon">chevron_down</i>
          </button>
          <button
            aria-label="Pin Menu"
            type="button"
            className="btn btn-icon-link invert d-lg-inline-block d-xlg-inline-block d-md-inline-block d-sm-none d-none"
            data-toggle-pin="sidebar"
          >
            <i className="pg-icon" />
          </button>
        </div>
      </div>
      <div className="sidebar-menu">
        <ul className="menu-items">
          <NavItem route={Routes.Home} />
          <NavItem route={Routes.Records.Entry} />
          <NavItem route={Routes.Records.Search} />
          <NavItem route={Routes.Vitals} />
          <NavItem route={Routes.Consultation} />
          <NavItem route={Routes.Ward} />
          <NavItem route={Routes.Maternal} />
          <NavItem route={Routes.Finance} />
          <NavItem route={Routes.Pharmacy} />
          <NavItem route={Routes.Laboratory} />
        </ul>
        <div className="clearfix" />
      </div>
    </nav>
  );
};

export default Sidebar;
