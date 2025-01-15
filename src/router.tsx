import { createBrowserRouter, RouteObject } from 'react-router-dom';

import AboutUs from './pages/AboutUs';
import Tickets from './pages/Tickets';
import DashboardLayout from './layout/DashBoardLayout';
import Authorization from './pages/Authorization';

const routes: RouteObject[] = [
  {
    path: '/', // This is the parent route
    element: <DashboardLayout />, // Use DashboardLayout here
    children: [
      { path: '', element: <div>Welcome to Dashboard</div> }, // Default content for "/"
      { path: 'about-us', element: <AboutUs /> },
      { path: 'tickets', element: <Tickets /> },
    ],
  },
  {
    path: '/login',
    element: <Authorization />,
  },
];

const router = createBrowserRouter(routes);

export default router;
