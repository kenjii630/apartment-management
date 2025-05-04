import homeRoute from "./home";
import aboutRoute from "./about";
import loginRoute from "./LoginRoute";
import NotFoundPage from "@/pages/NotFound";
import Unauthorized from "@/pages/Unauthorized";
import ProtectedRoute from "@/components/ProtectedRoute";
import parkingRoute from "./parking";
import roomRoute from "./room";
import ownerRoute from "./owner";
const raw = [
  ...homeRoute,
  ...aboutRoute,
  ...loginRoute,
  ...roomRoute,
  ...parkingRoute,
  ...ownerRoute,
  { path: "*", element: <NotFoundPage /> }, // Fallback route for 404
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
];

const routes = raw.map((route) => {
  // if route.roles is defined, wrap its element
  if (route.roles) {
    return {
      ...route,
      element: (
        <ProtectedRoute roles={route.roles}>{route.element}</ProtectedRoute>
      ),
    };
  }
  return route;
});
export default routes;
