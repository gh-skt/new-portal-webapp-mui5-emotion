import { useState, useContext, createContext } from "react";
import Cookies from "js-cookie";
type AuthProps = {
  user: any;
  logOut: () => void;
  logIn: (email: string, accessInfo: any) => void;
};
const AuthContext = createContext<Partial<AuthProps>>({});

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  console.log("🚀 ~ file: AuthContext.tsx ~ line 12 ~ AuthProvider ~ auth", auth)
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export function useProvideAuth() {
  const [user, setUser] = useState({});
  const logIn = async (email: string, accessInfo: any) => {
    console.log("🚀 ~ file: AuthContext.tsx ~ line 22 ~ useProvideAuth ~ user", user)
    setUser((prevState) => ({
      ...prevState,
      isLoggedIn: true,
      email,
      accessInfo,
    }));
    
    if (email && accessInfo) {
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          isLoggedIn: true,
          email: email,
          accessInfo: accessInfo,
        })
      );
      return "success";
    }
  };

  const logOut = async () => {
    Cookies.remove("next-auth.csrf-token");
    Cookies.remove("next-auth.callback-url");
    Cookies.remove("access_token");
    Cookies.remove("next-auth.session-token");
    Cookies.remove("orders_token");
    setUser({});
    caches.keys().then((keys) => {
      keys.forEach((key) => caches.delete(key));
    });
    Cookies.remove("user");
    localStorage.removeItem("userInfo");
    localStorage.clear();
    sessionStorage.clear();
  };

  return {
    user,
    logOut,
    logIn,
  };
}
