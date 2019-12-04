import React , {Component} from 'react' ;
import {signup} from "../authentication";
import {Link} from "react-router-dom";

class Signup extends Component {

    constructor (){
        super () ;
        this.state = {
            name :"",
            email : "",
            password :"",
            error :"",
            open : false
        }

    }


    // function inside function , work with with name, email or password
    handleChange =(name) => event =>{
        // clear the error while user is writing
        this.setState({error : ""}) ;
        // clear Account created, Sign In
        this.setState({open:false});

        this.setState({[name] : event.target.value});

    };

    clickSubmit = event => {
        // by default when click button , the page reload to avoid this :
        event.preventDefault();
        const {name , email , password} = this.state ;
        // use this when the key = the value (name = name,..)
        const user = {
            name,
            email,
            password
        };
        //console.log(user);

        // use this
        //this.signup(user) ;
        // or
        signup(user).then (data => {
            //error
            if (data.error) this.setState({error : data.error});

            // account created
            else this.setState({
                error : "",
                name : "",
                email : "",
                password : "",
                open : true
            });
        });

    };



    signupForm = (name, email, password) => (

        <form >
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={this.handleChange("name")} type="text" className="form-control" value={name} />

            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={this.handleChange("email")} type="email" className="form-control" value={email} />

            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={this.handleChange("password")} type="password" className="form-control" value={password}/>
                <small id="passwordHelp" className="form-text text-muted">combination of chars & number </small>

            </div>
        </form>
    );


    render() {
        const {name, email, password, error, open} = this.state ;
        return (
            <div className="container">

                {/* Conditional styling */}
                <div className="alert alert-danger" role="alert" style = {{display : error ? "":"none"}}>
                    {error}
                </div>

                <div className="alert alert-success" role="alert" style = {{display : open ? "":"none"}}>
                    Account created successfully , <Link to="/signin">Sign In</Link>
                </div>


                <h2 className="mt-5 mb-5">Signup</h2>


                {this.signupForm(name, email, password)}



                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary" >submit</button>




            </div>
        );
    }
}

export default Signup ;