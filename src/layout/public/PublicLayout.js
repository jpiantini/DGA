import React from 'react';
import routes from '../../router/AppRoutes';
import Router from '../../router/Router';
import ScrollToTopWithRouter from '../../router/ScrollToTopWithRouter';
const PublicLayout = () => {
    
    const getPublicRoutes = () => {
        return routes.filter((route) => route.layout === '/public');
    }
    return (

            <ScrollToTopWithRouter>
                <Router routes={getPublicRoutes()}/>
            </ScrollToTopWithRouter>
    );
}

export default PublicLayout;