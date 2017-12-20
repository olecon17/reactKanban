'use strict';

import React from 'react';
import { render } from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';
import WebsiteRoutes from './routes';

const AppLayout = (props) => {
    return (
        <div>
            { props.children }
        </div>
    )
}

render(
    (
        <AppLayout>
            <Router routes={ WebsiteRoutes } />
        </AppLayout>
    ),
    document.getElementById('root')
);
