import Owners from "@/modules/owner/index.jsx";
import EditOwner from "@/modules/owner/Edit.jsx";
import OwnerDetail from "@/modules/owner/ViewDetail";

const ownerRoute = [
  {
    path: "/owners",
    element: <Owners />,
    children: [],
    roles: ["admin"], // No roles required for this route
  },
  {
    path: "/owners/:id/edit",
    element: <EditOwner />,
    roles: ["admin"], // No roles required for this route
  },
  {
    path: "/owners/:id",
    element: <OwnerDetail />,
  },
];

export default ownerRoute;
