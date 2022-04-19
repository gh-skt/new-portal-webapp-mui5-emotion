import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { Toolbar, Typography, AppBar } from "@mui/material";

const withAuth = (AuthComponent) => {
  const Authenticated = (props) => {
    const router = useRouter();
    const [session] = useSession();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [userAccessInfo, setUserAccessInfo] = useState({} as any);
    useEffect(() => {
      const userInfo = localStorage.getItem("userInfo");
      const userAccessInfo = userInfo ? JSON.parse(userInfo) : {};
      const { isLoggedIn = false } = userAccessInfo;
      if (!isLoggedIn) {
        router.push("/" + (router.locale !== "en-US" ? router.locale : ""));
        return;
      }
      setLoggedIn(true);
      setUserAccessInfo(userAccessInfo);
    }, [session]);

    const { accessInfo = {} } = userAccessInfo;
    const { authorities = {} } = accessInfo;
    const { featureClaims = {} } = authorities;
    const hasAccess = Object.keys(featureClaims).find(
      (item) =>
        router.route.endsWith(item.split(" ").join("").toLowerCase()) || "new"
    );
    if (!isLoggedIn) return null;
    return (
      <>
        {hasAccess ? (
          <AuthComponent
            {...props}
            accessInfo={userAccessInfo}
            roles={featureClaims[hasAccess]}
          />
        ) : (
          <div>
            <AppBar position="sticky" color="default" id="AppBar">
              <Toolbar>
                <Typography color="error" variant="h4">
                  Forbidden: Access is Denied
                </Typography>
              </Toolbar>
            </AppBar>
            <Typography variant="h6">
              {`You don't have permission to view this page`}
            </Typography>
          </div>
        )}
      </>
    );
  };
  return Authenticated;
};
export default withAuth;
