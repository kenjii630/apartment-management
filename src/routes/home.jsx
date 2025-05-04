import Home from '@/pages/Home.jsx';

const homeRoute = [
  {
    path: '/',
    element: <Home />,
    children: [],
    roles: ['admin'], // No roles required for this route
  },
];

export default homeRoute;