import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  const { pathname } = useLocation();

  const hide =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/avatar" ||
    pathname === "/splash";

  return (
    <>
      {!hide && <Navbar />}
      <div className={!hide ? "pt-16" : ""}>
        <Outlet />
      </div>
    </>
  );
}