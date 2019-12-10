
import React , {Component} from 'react' ;
import {Link, Redirect} from 'react-router-dom' ;
import {signin,authenticate} from "../authentication";
import SocialLogin from "./SocialLogin";


class Signin extends Component {

    constructor (){
        super () ;
        this.state = {
            email : "",
            password :"",
            error :"",
            redirectToRefer : false,
            loading : false    //  the remote server take sometime to respond so add loading once submit
        };

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
        this.setState({loading : true}) ; // but set it false if the user is not autenticated
        const {email , password} = this.state ;
        // use this when the key = the value (name = name,..)
        const user = {
            email,
            password
        };
        console.log(user);

        // use this
        //this.signup(user) ;
        // or
        signin(user).then (data => {
            //error
            if (data.error) {
                this.setState({error : data.error, loading: false});}  // loading false no need to loading

            // account created
            else{
                // authenticate , and store the JWT(in response) in the local storage of browser
                authenticate( data, () => {
                    this.setState({redirectToRefer : true});
                });

            }

        });

    };







    signinForm = (email, password) => (

        <form>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={this.handleChange("email")} type="email" className="form-control" value={email}/>

            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={this.handleChange("password")} type="password" className="form-control" value={password}/>
                <small id="passwordHelp" className="form-text text-muted">combination of chars & number </small>

            </div>

            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary" >submit</button>
                {""}
            <p className="mt-2">
                <Link to="/forgot-password" className="text-dark">
                    <i className="fas fa-key"></i>
                    Forgot Password
                </Link>
            </p>


        </form>

    );






    render() {
        const {email, password, error, redirectToRefer, loading} = this.state ;
        if (redirectToRefer){
            return <Redirect to="/" />
        }



        return (

            <div className="container">

                    {/* Conditional styling */}
                    <div className="p-3 mb-2 bg-info text-white" role="alert" style = {{display  : loading && !error ? "":"none"}}>
                        Loading ...
                    </div>


                    <div className="alert alert-danger" role="alert" style = {{display : error ? "":"none"}}>
                        {error}
                    </div>


                {/*
                <Offline>
                    <div className="p-3 mb-2 bg-warning text-dark" role="alert" >
                    Please verify your internet connection
                    </div>
                </Offline>
                */}

                <h2 className="mt-5 mb-5">SignIn</h2>



                {this.signinForm(email, password)}

                <>
                    <SocialLogin />
                </>

            </div>
        );
    }
}


export default Signin ;