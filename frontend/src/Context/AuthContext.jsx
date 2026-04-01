import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadAuthFromStorage() {
      const storedToken = Cookies.get("token");
      const storedUser = Cookies.get("user");

      if (storedToken) {
        setToken(storedToken);
      }

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Failed to parse user cookie", e);
        }
      }

      setLoading(false);
    }

    loadAuthFromStorage();
  }, []);

  const login = (token, user) => {
    Cookies.set("token", token, { expires: 30 }); // Expire in 30 days
    Cookies.set("user", JSON.stringify(user), { expires: 30 });

    setToken(token);
    setUser(user);
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");

    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
  };

  if (loading) return <></>;

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
