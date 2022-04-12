import React, { useState } from 'react';
import { List, ListItem, ListItemText, IconButton, Box, makeStyles, Drawer, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { signOut } from 'next-auth/client';
import useTranslation from 'next-translate/useTranslation';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { routes } from '../config/RoutesConfig';

const HamburgerMenuWrapper = styled(Box)(({ theme }) => {
  return {
    "& .root": {
      '.MuiBackdrop-root': {
        backgroundColor: 'rgba(0,0,0,0.05)',
      },
    },
    "& .drawerContainer": {
      backgroundColor: '#195ea7',
      width: '320px',
      color: '#AEC2DC',
      textTransform: 'uppercase',
    },
    "& .iconButtonContainer": {
      marginLeft: 'auto',
      color: '#1A5EA7',
    },
  
    "& .menuIconToggle": {
      fontSize: '3rem',
    },
    "& .lastLogin": {
      fontSize: '0.7rem',
    },
    "& .grantAccessButton": {
      display: 'none',
      [theme.breakpoints.down('xs')]: {
        display: 'block',
      },
    },
  }
});

const HamburgerMenu = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [adminExpand, setAdminExpand] = useState(false);
  const [pharmaExpand, setPharmaExpand] = useState(false);
  const { userInfo = {}, authUser = '' } = props;
  const router = useRouter();
  const { t } = useTranslation();
  const { logOut } = useAuth();
  const accessInfo = userInfo.accessInfo || {};
  const authorities = accessInfo.authorities || {};
  const { admin: isAdmin } = authorities;
  const featureClaims = authorities.featureClaims || {};
  const userClaims = userInfo && Object.keys(featureClaims);

  const isRouteEnabled = (label) => userClaims.find((it) => it.toLowerCase() === label.toLowerCase());
  const logout = async (e) => {
    e.preventDefault();
    localStorage.removeItem('userInfo');
    logOut();
    let callbackUrl = '/' + (router.locale !== 'en-US' ? router.locale : '');
    const authURL = `https://guardant.oktapreview.com/login/signout?fromURI=${location.origin}/login`;
    await router.push(authURL);
    await signOut({ redirect: false });
    router.push(callbackUrl);
  };
  const adminMenu = (routes) => {
    return (
      <>
        {
          <ListItem
            divider
            onClick={() => {
              setAdminExpand((previous) => {
                return !previous;
              });
            }}
          >
            <ListItemText>
              <a href="#">
                {t('common:administrator')}
                {routes.map((route, index) => {
                  const activeClass = router.pathname === route.path ? 'activeSideNav' : '';
                  return (
                    adminExpand &&
                    isRouteEnabled(route.label) && (
                      <ListItem key={index} button onClick={() => setOpenDrawer(false)}>
                        <ListItemText className="activeClass">
                          <Link href={route.path}>
                            <a key={route.label}>{t(`common:${route.label}`)}</a>
                          </Link>
                        </ListItemText>
                      </ListItem>
                    )
                  );
                })}
              </a>
            </ListItemText>
          </ListItem>
        }
      </>
    );
  };

  const pharmaMenu = (routes) => {
    return (
      <>
        {
          <ListItem
            divider
            onClick={() => {
              setPharmaExpand((previous) => {
                return !previous;
              });
            }}
          >
            <ListItemText>
              <a href="#">
                {t('common:pharma')}
                {routes.map((route, index) => {
                  const activeClass = router.pathname === route.path ? 'activeSideNav' : '';
                  return (
                    pharmaExpand &&
                    isRouteEnabled(route.label) && (
                      <ListItem key={index} button onClick={() => setOpenDrawer(false)}>
                        <ListItemText className="activeClass">
                          <Link href={route.path}>
                            <a key={route.label}>{t(`common:${route.label}`)}</a>
                          </Link>
                        </ListItemText>
                      </ListItem>
                    )
                  );
                })}
              </a>
            </ListItemText>
          </ListItem>
        }
      </>
    );
  };
  const routeLinks = routes.map((route, index) => {
    const hasExpandMenu = route.routes.length > 0;
    const adminRoutes = hasExpandMenu ? adminMenu(route?.routes) : null;
    const pharmaRoutes = hasExpandMenu ? pharmaMenu(route?.routes) : null;
    const enabledRoute =
      route.label === 'administrator' ? isAdmin : isRouteEnabled(route.label != 'pharma' ? route.label : 'matchgen');
    const activeClass = router.pathname === route.path ? 'activeSideNav' : '';
    return enabledRoute && route.label !== 'administrator' && route.label !== 'pharma' ? (
      <ListItem key={index} divider button onClick={() => setOpenDrawer(false)}>
        <ListItemText className="activeClass">
          <Link href={route.path}>
            <a>{t(`common:${route.label}`)}</a>
          </Link>
        </ListItemText>
      </ListItem>
    ) : (
      route.label === 'administrator'?adminRoutes:pharmaRoutes
    );
  });
  return (
    <HamburgerMenuWrapper>
      <Drawer
        anchor="left"
        classes={{ root: "root", paper: "drawerContainer" }}
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <List>
          <ListItem divider>
            <ListItemText>
              {authUser}
              <br />
            </ListItemText>
          </ListItem>
          <ListItem divider className="grantAccessButton">
            <ListItemText>
              <Link href="/profile">
                <a>{t(`common:profile`)}</a>
              </Link>
            </ListItemText>
          </ListItem>
          {routeLinks}
          {userInfo?.accessInfo?.authorities?.featureClaims?.Settings && (
            <ListItem onClick={() => setOpenDrawer(false)}>
              <ListItemText>
                <a href="#">{t('common:settings')}</a>
              </ListItemText>
            </ListItem>
          )}
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <a href="#">{t('common:help')}</a>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <a href="#">{t('common:TAndC')}</a>
            </ListItemText>
          </ListItem>
          <ListItem divider onClick={(e) => logout(e)}>
            <ListItemText>
              <a href="#">{t('common:logout')}</a>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <IconButton className="iconButtonContainer" onClick={() => setOpenDrawer(!openDrawer)} disableRipple>
        <MenuIcon className="menuIconToggle" />
      </IconButton>
    </HamburgerMenuWrapper>
  );
};
export default HamburgerMenu;
