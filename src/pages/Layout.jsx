import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "../navigation/BottomNav";

export default function Layout() {
  const location = useLocation();

  // List of routes where BottomNav should NOT appear
  const hideNavRoutes = ["/login", "/signup", "/forgot-password"];

  const showNav = !hideNavRoutes.includes(location.pathname);

  return (
    <>
      <Outlet /> {/* This renders the child route */}
      {showNav && <BottomNav />}
    </>
  );
}
