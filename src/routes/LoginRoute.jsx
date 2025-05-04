import LoginPage from "@/modules/auth/Login";

const loginRoute = [
  {
    path: '/login',
    element: <LoginPage />,
    children: [],
  },
];

export default loginRoute;
