import RoomManagement from "@/modules/room/index.jsx";
import EditRoom from "@/modules/room/Edit.jsx";

const roomRoute = [
  {
    path: "/rooms",
    element: <RoomManagement />,
    children: [],
    roles: ["admin"], // No roles required for this route
  },
  {
    path: "/rooms/:id/edit",
    element: <EditRoom />,
    roles: ["admin"], // No roles required for this route
  },
];

export default roomRoute;