import LoadSpinner from 'app/components/LoadSpinner';

const WebSiteRoutes = {
    childRoutes: [
        {
            path: '/',
            indexRoute: {
                getComponent(location, cb) {
                    LoadSpinner(
                        import(/* webpackChunkName: "home" */'app/content/Home'),
                        cb,
                        'home'
                    );
                }
            },
        },
    ]
};


// Adding the Home directory instructs webpack to create a new file here.
// This component will check if all others are loaded and display a loading message accordingly

export default WebSiteRoutes;