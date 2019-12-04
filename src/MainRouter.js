import React from 'react';
import {Route, Switch} from 'react-router-dom' ;
import Home from "./core/Home";
import Menu from "./core/Menu";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import Users from "./user/Users";
import EditProfile from "./user/EditProfile";
import PrivateRoute from "./authentication/PrivateRoute";
import FindPeople from "./user/FindPeople";
import NewPost from "./post/NewPost";
import SinglePost from "./post/SinglePost";
import EditPost from "./post/EditPost";
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";

const MainRouter = () => (
    <div>
        <Menu/>
        <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword}/>
            <PrivateRoute exact path="/post/create/" component={NewPost} />
            <PrivateRoute exact path="/post/:postId" component={SinglePost} />
            <PrivateRoute exact path="/post/edit/:postId" component={EditPost} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <PrivateRoute exact path="/edit/:userId" component={EditProfile}/> {/*EditProfile will not added in Menu*/}
            <PrivateRoute exact path="/user/:userId" component={Profile} /> {/*after ':' , its captured as a userId*/}
            <PrivateRoute exact path="/users" component={Users} />
            <PrivateRoute exact path="/findpeople" component={FindPeople} />



        </Switch>
    </div>

);

// use in App.js
export default MainRouter ;