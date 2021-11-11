import Login from '../views/Auth/Login/Login';
import Register from '../views/Auth/Register/Register';
import Home from '../views/Home/Home';
import ListOfServicesPerCategory from '../views/ListOfServicesPerCategory/ListOfServicesPerCategory';
import ServiceDescription from '../views/ServiceDescription/ServiceDescription';

const routes = [
    {
        path: '/',
        component: Home,
        exact: true,
        layout:'/public',
        loginRequired:false
    },
    {
        path: '/login',
        component: Login,
        exact: true,
        layout:'/public',
        loginRequired:false
    },
    {
        path: '/register',
        component: Register,
        exact: true,
        layout:'/public',
        loginRequired:false
    },
    {
        path: '/serviceDescription',
        component: ServiceDescription,
        exact: true,
        layout:'/app',
        loginRequired:false
    },
    {
        path: '/listOfServices',
        component: ListOfServicesPerCategory,
        exact: true,
        layout:'/app',
        loginRequired:false
    },
];

export default routes;