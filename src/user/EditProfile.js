import React , {Component} from "react";
import {isAuthenticated, signup} from "../authentication";
import {read, update, updateUser} from "./apiUser";
import {Link, Redirect} from "react-router-dom";
import DefaultProfilePicture from "../images/User_Avatar.png" ;

class EditProfile extends Component{
    constructor() {
        super();
        this.state = {
            id : "",
            name :"",
            email:"",
            password : "",
            redirectToProfile : false,
            error: "",
            loading : false,
            fileSize : 0,
            about : ""      // user description
        }}

    // the logic of componentDidMount
    init =  userId => {
        const token = isAuthenticated().token ;
        read(userId, token).then(data => {
            if(data.error)  {
                this.setState({redirectToProfile: true}) ;}
            else
            {
                this.setState(
                    {
                        id:data._id,
                        name :data.name,
                        email: data.email,
                        error : "",
                        about : data.about
                    });}

        });

    };



    componentDidMount() {


        // to send the data( profile pict)  : use FormData api
        this.userData = new FormData() ;

        // use the userId in route to make reequest to backend to make more infs about the user
        // i have certains infs(name, email) in the local storage.
        const userId = this.props.match.params.userId ;
        this.init(userId);
    }

    // check if inputs are valid
    isValid =() =>{
        const {name, email,password, fileSize} = this.state ;

        if (name.length === 0 ){
            this.setState({error : "Name is required"});
            return false;
        }
        if(!/^([a-z0-9._-]+)@([a-z0-9._-]+)\.([a-z]{2,6})$/.test(email)){
            this.setState({error : "Email is not valid"});
            return false;
        }
        if (password.length > 0 && password.length < 6 ){
            this.setState({error : "Password should contain 6 or more characters"});
            return false;
        }
        if (fileSize > 100000 ){
            this.setState({error : "file size should be < 1 MB "});
            return false;
        }

        // if no errors
        return true;

    };



    // function inside function , work with with name, email or password
    handleChange =(name) => event =>{

        // grab the first file if the handlechange('photo') , else grab the name
        const value = name === 'photo' ? event.target.files[0]:event.target.value;

        const fileSize = name === 'photo' ? event.target.files[0].size : 0;
        this.userData.set(name, value); //if the name is email, the value is the val of email , if photo , the val of photo
        this.setState({[name] : value, fileSize}); // write : fileSize:fileSize  or fileSize


        // clear the error when the user is writing
        this.setState({error : ""}) ;

    };

    clickSubmit = event => {
            // by default when click button , the page reload to avoid this :
            event.preventDefault();

        if (this.isValid()){
            //const {name , email , password} = this.state ;
            // use this when the key = the value (name = name,..)
            // i dont need user object after adding profile picture
            /*const user = {
                name,
                email,
                password : password || undefined
            };*/
            //console.log(user);
            // edit the user now
            const userId  = this.props.match.params.userId ;
            const token = isAuthenticated().token ;


            // this.userData is was user , before adding photo modification in Edit profile
            update(userId, token,this.userData).then (data => {
                //error
                if (data.error) this.setState({error : data.error});

                // account created
                else{

                    // the app is such so fast , its not possible to see the loading nav
                    this.setState({
                        loading : true
                    });

                    // update the local storage with the new user , and make the call back function
                    updateUser(data, () => {

                        this.setState({
                            redirectToProfile : true
                        });

                    });

                  }
            });
        }

    };



    signupForm = (name, email, password, about) => (

        <form >
            <div className="card text-center ">
                <div className="card-header">
                    <h4 className="mt-3">Update Profile</h4>
                </div>


                <div className="card-body m-4">
                    <div className="form-group form-row">
                        <label className="text-muted">Name</label>
                        <input onChange={this.handleChange("name")} type="text" className="form-control text-center" value={name} />

                    </div>

                    <div className="form-group form-row">
                        <label className="text-muted">Email</label>
                        <input onChange={this.handleChange("email")} type="email" className="form-control text-center" value={email} />

                    </div>

                    <div className="form-group form-row">
                        <label className="text-muted">Password</label>
                        <input onChange={this.handleChange("password")} type="password" className="form-control text-center" value={password}/>
                        <small id="passwordHelp" className="form-text text-muted">if you dont fill in the password, it will not be changed </small>

                    </div>

                    <div className="form-group form-row">
                        <label className="text-muted">About</label>
                        <textarea onChange={this.handleChange("about")} type="text" className="form-control text-center" value={about} />

                    </div>

                    <div className="form-group form-row">
                        <label className="text-muted">Profile picture</label>
                        <input onChange={this.handleChange("photo")} accept="image/*" type="file" className="form-control-file" id="formControlFile1"/>
                    </div>



                </div>



                <div className="card-footer text-muted">
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary" >Update</button>
                </div>
            </div>


        </form>


    );


    render() {

        const {id, name, email, password, redirectToProfile, error, loading, about} = this.state ;




        if (redirectToProfile) {

            return <Redirect to={`/user/${id}`}/>
        }

        {/* ${new Date().getTime()} :avoid : when change the photo, save , and return to make edit profile , the browser load the old pic from cache*/}
        const photoURL = id ? `${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}`: DefaultProfilePicture ;


        return(
            <div className="container">

                <div className="alert bg-danger mb-sm-1" role="alert" style = {{display : error ? "":"none"}}>
                    {error}
                </div>

                <div className="p-3 mb-2 bg-info text-white" role="alert" style = {{display  : loading && !error ? "":"none"}}>
                    Loading
                </div>




                {this.signupForm(name, email, password, about)}

                <img
                    src={photoURL}
                    alt={this.state.name}
                    onError={img => (img.target.src = `${DefaultProfilePicture}`)}
                    style={{width:'10%', height:'10%', objectFit:'cover'}} />


            </div>



        );


    }
}

export default EditProfile ;