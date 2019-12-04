import React from 'react'
import {signout, isAuthenticated} from "../authentication";
import {Link, withRouter} from "react-router-dom"; {/* withRouter is higher order componenent: take other argoment as an argument */}


// define which link is active in the nav bar
const isActive = (history, path) => {
    if(history.location.pathname === path) return {color : "#ffffff"};
    else return {color: "#ffffff",opacity: 0.4, cursor : "pointer"}
};

// menu 'fixed-top' to fix it
const Menu = ({history}) => (
    <div>

        <ul className="nav nav-tabs bg-dark ">
            <li className="nav-item">
                <Link  className="nav-link" style={isActive(history, "/")} to="/">
                    <i className="fas fa-home"></i> {" "}
                    Home</Link>
            </li>

            <li className="nav-item">
                <Link  className="nav-link" style={isActive(history, "/users")} to="/users">
                    <i className="fas fa-users"></i> {" "}
                    Users</Link>
            </li>

            {!isAuthenticated() && (
                <> {/* react fragment like div, to avoid error */}
                    <li className="nav-item">
                        <Link  className="nav-link" style={isActive(history, "/signin")} to="/signin">
                            <i className="fas fa-sign-in-alt"></i>{" "}
                            Sign in</Link>
                    </li>
                    <li className="nav-item">
                        <Link  className="nav-link" style={isActive(history, "/signup")} to="/signup">
                            <i className="fas fa-user-plus"></i>{" "}
                            Sign up</Link>
                    </li>
                </>
            )}

            {isAuthenticated() && (
                <>


                    <li className="nav-item">
                        {/* i used <a> because no need to navigate between components */}

                            <Link
                                className="nav-link"
                                to = {`/user/${isAuthenticated().user._id}`}
                                style={isActive(history, `/user/${isAuthenticated().user._id}`)}>
                                <i className="fas fa-user"></i> {" "}
                             {`${isAuthenticated().user.name} - profile`}  {/* user is returned as a response from local storage in isAuthenticated */}

                            </Link>

                    </li>


                    <li className="nav-item">
                        {/* i used <a> because no need to navigate between components */}

                        <Link
                            className="nav-link"
                            to = {`/post/create`}
                            style={isActive(history, `/post/create`)}>
                            <i className="fas fa-plus-circle"></i> {" "}
                            Create post

                        </Link>

                    </li>


                    <li className="nav-item">
                        {/* i used <a> because no need to navigate between components */}

                        <Link
                            className="nav-link"
                            to = {`/findpeople`}
                            style={isActive(history, `/findpeople`)}>

                            <i className="fas fa-user-plus"></i> {" "}
                            Find people

                        </Link>

                    </li>
                    <li className="nav-item">
                        <span
                            className="nav-link"
                            style={isActive(history,"/signup")}
                            onClick={() => signout(() => history.push('/'))}
                        >
                            <i className="fas fa-sign-out-alt"></i>{" "}
                            Sign out</span>
                    </li>
                </>
            )}

            {/* {JSON.stringify(props.history)} */}

        </ul>

    </div>



);

export default withRouter(Menu) ; {/* the benefit of withRouter is to access to props => to get access to history object*/}


