import { useEffect } from 'react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import GobMessage from '../../components/GobMessage/GobMessage';
import routes from '../../router/AppRoutes';
import { useLocation } from 'react-router-dom'
import Router from '../../router/Router';
import Header from './components/Header/Header';
import {
    LayoutDivider,
    LayoutContainer,
    LayoutBodyContainer,
    LayoutBodyDivider,
    LayoutFooterDivider
} from './styles/AppLayoutStyles';
import SubHeader from './components/SubHeader/SubHeader';

const AppLayout = ({ children }) => {

    const location = useLocation();
    const history = useHistory();

    const authenticated = true;
    const [viewAvailableToShow, setViewAvailableToShow] = React.useState(false);

    /*  const reviewRoute = () => {
           let currentRouteName = location.pathname;
           let layoutRoutes = routes.filter((route) => route.layout === '/app');
           let currentRoute = layoutRoutes.find((route) => route.path === currentRouteName);
           console.log(currentRouteName, currentRoute)
           if (currentRoute?.loginRequired === true && authenticated === false) {
               history.push('/public/login')
           }
           if (currentRoute) {
               setViewAvailableToShow(true)
           } else {
               setViewAvailableToShow(false);
           }
       }
   */
    const getAppRoutes = () => {
        return routes.filter((route) => route.layout === '/app');
    }
    /*   React.useLayoutEffect(() => {
           reviewRoute();
       }, []);
       */

    return (
        <LayoutContainer>
            <GobMessage />
            <Header />
            <SubHeader />
            <LayoutBodyDivider/>
            <LayoutBodyContainer>
                <Router routes={getAppRoutes()} />
            </LayoutBodyContainer>
            <LayoutFooterDivider/>            
            <Footer />
        </LayoutContainer>

    );
}

export default AppLayout;