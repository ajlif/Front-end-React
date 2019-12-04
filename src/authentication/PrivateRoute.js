import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isAuthenticated} from "./index";

// PrivateRoute is used to forcing non authenticated user to authenticate to access certain components, it will be used instead of Route in MainRouter
// can use return ,or () instead of {}
const PrivateRoute = ({component : Component, ...rest})  =>{             // ... the rest of the arguments
    // props means components passed down to this private route component.
    return <Route {...rest} render={props => isAuthenticated() ? (
       <Component {...props}/>  // render this component with all the props
    ):(
        <Redirect to={{pathname: "/signin", state : {from : props.location }}}/>
    )}/>


    };

export default PrivateRoute ;