import { useEffect, useState } from 'react';
import {Box} from "@mui/material"
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { routes } from '../config/RoutesConfig';

const Navigation = (props) => {
  const [toggleNav, setToggleNav] = useState('');
  const [togglePhama, setTogglePharma] = useState('');
  const { userInfo = {} } = props;
  const router = useRouter();
  const { t } = useTranslation('common');
  const accessInfo = userInfo.accessInfo || {};
  const authorities = accessInfo.authorities || {};
  const { admin: isAdmin } = authorities;
  const featureClaims = authorities.featureClaims || {};
  const userClaims = userInfo && Object.keys(featureClaims);
  const documentClickHandler = () => {
    setToggleNav('');
    setTogglePharma('');
  };
  useEffect(() => {
    document.addEventListener('click', documentClickHandler);
    return () => {
      document.addEventListener('click', documentClickHandler);
    };
  }, []);

  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleNav === '' ? setToggleNav('show') : setToggleNav('');
  };

  const togglePharma = (e) => {
    e.preventDefault();
    e.stopPropagation();
    togglePhama === '' ? setTogglePharma('show') : setTogglePharma('');
  };
  const isRouteEnabled = (label) => userClaims.find((it) => it.toLowerCase() === label.toLowerCase());

  const expandMenu = (routes) => {
    return (
      <div className={`dropdown-menu ${toggleNav}`}>
        {routes.map((route,index) => {
          return (
            isRouteEnabled(route.label) && (
              <Link href={route.path} key={index}>
                <a key={route.label} className="dropdown-item">
                  {t(`common:${route.label}`)}
                </a>
              </Link>
            )
          );
        })}
      </div>
    );
  };
  const pharmaExpandMenu = (routes) => {
    return (
      <div className={`dropdown-menu ${togglePhama}`}>
        {routes.map((route,index) => {
          return (
            <Link href={route.path} key={index}>
              <a key={route.label} className="dropdown-item">
                {t(`common:${route.label}`)}
              </a>
            </Link>
          );
        })}
      </div>
    );
  };
  const routeLinks = routes.map((route) => {
    const hasExpandMenu = route.routes.length > 0;
    const expandRoutes = hasExpandMenu
      ? route.label == 'administrator'
        ? expandMenu(route.routes)
        : pharmaExpandMenu(route.routes)
      : null;
    const enabledRoute =
      route.label === 'administrator' ? isAdmin : isRouteEnabled(route.label != 'pharma' ? route.label : 'matchgen');
    const activeClass = router.pathname === route.path ? 'active' : '';
    return enabledRoute ? (
      <li key={route.label} className="nav-item">
        {hasExpandMenu ? (
          <>
            <a
              href=""
              onClick={route.label == 'administrator' ? toggleDropdown : togglePharma}
              className="nav-link dropdown-toggle"
            >
              {t(`common:${route.label}`)}
            </a>
            {expandRoutes}
          </>
        ) : (
          <Link href={route.path}>
            <a className={`nav-link ${activeClass}`}>{t(`common:${route.label}`)}</a>
          </Link>
        )}
      </li>
    ) : null;
  });
  return (
    <nav className="navbar">
      <ul className="navbar-nav"> {routeLinks}</ul>
    </nav>
  );
};
export default Navigation;
