import { createBrowserRouter, RouteObject } from 'react-router-dom';
import AboutUs from './pages/AboutUs';
import Tickets from './pages/Tickets';
import DashboardLayout from './layout/DashBoardLayout';
import RequireAuth from './hoc/RequireAuth';
import TicketsDetails from './pages/TicketDetails';

const routes: RouteObject[] = [
  {
    path: '/', // Главный маршрут
    element: (
      <RequireAuth>
        <DashboardLayout />
      </RequireAuth>
    ), // Защищаем DashboardLayout
    children: [
      { path: '', element: <div>Добро пожаловать</div> }, // Контент по умолчанию для "/"
      { path: 'about-us', element: <AboutUs /> },
      { path: 'tickets', element: <Tickets /> },
      { path: 'ticket-details/:id?', element: <TicketsDetails /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
