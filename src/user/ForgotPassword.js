import React, { Component } from "react";
import {forgotPassword} from "../authentication";
import {Link} from "react-router-dom";

class ForgotPassword extends Component {
    state = {
        email: "",
        message: "",
        error: ""
    };

    forgotPassword = e => {
        e.preventDefault();
        this.setState({ message: "", error: "" });
        forgotPassword(this.state.email).then(data => {
            if (data.error) {
                console.log("error :", data.error);
                this.setState({ error: data.error });
            } else {
                console.log("message", data.message);
                this.setState({ message: data.message, email: "" });
            }
        });
    };

    render() {
        const {message, error, success} = this.state ;
        return (
            <div className="container">

                <div className="alert alert-danger" role="alert" style = {{display : error ? "":"none"}}>
                    {error}
                </div>

                <div className="alert alert-success" role="alert" style = {{display : message ? "":"none"}}>
                    <i className="fas fa-envelope"></i>{" "}{message}
                </div>

                <h2 className="mt-5 mb-5">Ask for Password Reset</h2>

                <form>
                    <div className="form-group mt-5">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Your email address"
                            value={this.state.email}
                            name="email"
                            onChange={e =>
                                this.setState({
                                    email: e.target.value,
                                    message: "",
                                    error: ""
                                })
                            }
                            autoFocus
                        />
                    </div>
                    <button
                        onClick={this.forgotPassword}
                        className="btn btn-raised btn-primary"
                    >
                        Send Password Rest Link
                    </button>
                </form>
            </div>
        );
    }
}

export default ForgotPassword;