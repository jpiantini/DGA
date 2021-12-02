import { Redirect } from 'react-router';
import Login from '../views/Auth/Login/Login';
import Register from '../views/Auth/Register/Register';
import RegisterNew from '../views/Auth/RegisterNew/RegisterNew';
import Home from '../views/Home/Home';
import ListOfServicesPerCategory from '../views/ListOfServicesPerCategory/ListOfServicesPerCategory';
import MyDesk from '../views/MyDesk/MyDesk';
import RequestService from '../views/RequestService/RequestService';
import ServiceDescription from '../views/ServiceDescription/ServiceDescription';

const routes = [
    {
        path: '/',
        component: Home,
        exact: true,
        layout: '/public',
        loginRequired: false
    },
    {
        path: '/login',
        component: Login,
        exact: true,
        layout: '/public',
        loginRequired: false
    },
    {
        path: '/register',
        component: RegisterNew,
        exact: true,
        layout: '/app',
        loginRequired: false
    },
    {
        path: '/serviceDescription/:id',
        component: ServiceDescription,
        exact: true,
        layout: '/app',
        loginRequired: false
    },
    {
        path: '/listOfServices/:id',
        component: ListOfServicesPerCategory,
        exact: true,
        layout: '/app',
        loginRequired: false
    },
    {
        path: '/myDesk',
        component: MyDesk,
        exact: true,
        layout: '/app',
        loginRequired: true
    },
    {
        path: '/requestService/:id',
        component: RequestService,
        exact: true,
        layout: '/app',
        loginRequired: true
    },
    {
        path: '*',
        layout: '/public', 
        component: () => <Redirect to='/public' />,
    },
    {
        path: '*',
        layout: '/app', 
        component: () => <Redirect to='/public' />, //Can be changed for a not login required route inside app
    },
];

export default routes;