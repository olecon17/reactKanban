import React from 'react';
import { message } from 'antd';

const scripts = {};

const LoadSpinner = (component, callback, script_name) => {
    const previousLoaded = Object.keys(scripts).every( (script) => { return scripts[script] === true});

    if (! scripts[script_name]) {
        scripts[script_name] = false;
    }
    if (scripts[script_name] && scripts[script_name] === true) {
        return component.then( response => {
            return callback( null, response.default );
        });
    }
    const allLoaded = Object.keys(scripts).every( (script) => { return scripts[script] === true});
    let load_msg = '';

    if (previousLoaded) {
        load_msg = message.loading('Loading...', 0);
    }

    return component.then( response => {
        if ( allLoaded ) { load_msg(); }
        scripts[script_name] = true;
        return callback( null, response.default );
    })
        .catch( error => {
            throw new Error(`Component loading failed: ${error}`);
        });

};

export default LoadSpinner;
