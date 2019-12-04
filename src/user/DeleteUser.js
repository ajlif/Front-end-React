import React , {Component} from "react";
import {Redirect} from "react-router-dom";
import {isAuthenticated} from "../authentication";
import {remove} from "./apiUser";
import {signout} from "../authentication";



class DeleteUser extends Component{

    //we dont need super , just the state to temporarly handle the "redirect"
    state ={
        redirect : false
    };

    deleteConfirmed =()=>{
        let answer = window.confirm("your account will be deleted definitely, you want to ontinue ?") ;
        answer? this.deleteAccount() : console.log("delete account not confirmed") ;

    };

    deleteAccount=()=>{
        console.log("delete account confirmed");
        const token = isAuthenticated().token ;
        const userId = this.props.userId ;      // this come from : <DeleteUser userId={user._id}/> in Profile.js
        remove(userId, token)
            .then(data => {
                if(data.error){
                    console.log(data.error);
                }
                else {
                    // signout
                    signout(()=> console.log("user deleted")); // take a function as an argoment

                    //redirect
                    this.setState({redirect : true});

                }
            })

    };



    render() {

        if(this.state.redirect)  {return (<Redirect to="/signin" />);}

        return(
            <button onClick={this.deleteConfirmed} className="btn btn-raised btn-outline-danger">Delete profile</button>

        );
    }
}

export default DeleteUser ;







/*
import React , {Component} from "react";
import {Link} from "react-router-dom";

export class DeleteUser extends Component{
    render() {
        return(
            <button className="btn btn-outline-danger">Delete profile</button>

        );
    }
}

export default DeleteUser ;
*/