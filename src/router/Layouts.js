import { Redirect } from 'react-router';
import AppLayout from '../layout/app/AppLayout';
import PublicLayout from '../layout/public/PublicLayout';

const routes = [
  {
    path: '/public',
    component: PublicLayout,
  },
  {
    path: '/app',
    component: AppLayout,
  },
  {
    path: '/',
    component: () => <Redirect to='/public'/>,
  },
];

export default routes;