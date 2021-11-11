import React from 'react';
import routes from '../../router/AppRoutes';
import Router from '../../router/Router';
const PublicLayout = () => {
    
    const getPublicRoutes = () => {
        return routes.filter((route) => route.layout === '/public');
    }
    return (

            <React.Fragment>
                <Router routes={getPublicRoutes()}/>
            </React.Fragment>
    );
}

export default PublicLayout;