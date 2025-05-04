import ParkingManagement from "@/modules/parking/index.jsx";
import EditParking from "@/modules/parking/Edit.jsx";

const parkingRoute = [
  {
    path: "/parking",
    element: <ParkingManagement />,
    children: [],
    roles: ["admin"], // No roles required for this route
  },
  {
    path: "/parking/:id/edit",
    element: <EditParking />,
    roles: ["admin"], // No roles required for this route
  },
];

export default parkingRoute;
