import React from 'react';
import Footer from './components/Footer/Footer';
import GobMessage from '../../components/GobMessage/GobMessage';
import routes from '../../router/AppRoutes';
import Router from '../../router/Router';
import Header from './components/Header/Header';
import SubHeader from './components/SubHeader/SubHeader';
import {
    LayoutDivider,
    LayoutContainer,
    LayoutBodyContainer,
    LayoutBodyDivider,
    LayoutFooterDivider
} from './styles/AppLayoutStyles';
import ScrollToTopWithRouter from '../../router/ScrollToTopWithRouter';

const AppLayout = ({ children }) => {

    const getAppRoutes = () => {
            return routes.filter((route) => route.layout === '/app');
    }

    return (
        <LayoutContainer>
            <GobMessage />
            <Header />
            <SubHeader />
            <LayoutBodyDivider />
            <LayoutBodyContainer>
                <ScrollToTopWithRouter>
                <Router routes={getAppRoutes()} />
                </ScrollToTopWithRouter>
            </LayoutBodyContainer>
            <LayoutFooterDivider />
            <Footer />

        </LayoutContainer>

    );
}

export default AppLayout;