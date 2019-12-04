import React , {Component} from "react";
import {isAuthenticated} from "../authentication";
import {create} from "./apiPost";
import {Redirect} from "react-router-dom";

class NewPost extends Component{
    constructor() {
        super();
        this.state = {
            title : "",
            body :"",
            photo : "",
            error : "",
            fileSize : 0,
            user : {}, // an empty object : which user created this post
            redirectToProfile : false
        };
    }


    componentDidMount() {


        // to send the data( profile pict)  : use FormData api
        this.postData = new FormData() ;
        this.setState({user: isAuthenticated().user});
    }

    // check if inputs are valid
    isValid =() => {
        const {title, body, fileSize} = this.state ;

        if (body.length === 0 || title.length === 0 ){
            this.setState({error : "title and body are required"});
            return false;
        }

        if (fileSize > 100000 ){
            this.setState({error : "file size should be < 1 MB "});
            return false;
        }

        // if no errors
        return true;

    };



    // function inside function
    handleChange = name => event => {

        // grab the first file if the handlechange('photo') , else grab the name
        const value= name === 'photo' ? event.target.files[0] : event.target.value;

        const fileSize = name === 'photo' ? event.target.files[0].size : 0;
        this.postData.set(name, value); //if the name is email, the value is the val of email , if photo , the val of photo
        this.setState({[name] : value, fileSize}); // write : fileSize:fileSize  or fileSize



        // clear the error when the user is writing
        this.setState({error : ""}) ;


    };

    clickSubmit = event => {
        // by default when click button , the page reload to avoid this :
        event.preventDefault();

        if (this.isValid()){

            const userId  = isAuthenticated().user._id ;
            const token = isAuthenticated().token ;


            // this.userData is was user , before adding photo modification in Edit profile
            create(userId, token, this.postData).then(data => {
                if (data.error) this.setState({ error: data.error });

                else{
                    console.log("New post : ", data);
                    this.setState({
                        title: "",
                        body: "",
                        redirectToProfile: true
                    });

                }
            });
        }

    };



    newPostForm = (title, body) => (

        <form >
            <div className="card text-center ">
                <div className="card-header">
                    <h4 className="mt-3">Create post</h4>
                </div>


                <div className="card-body m-4">
                    <div className="form-group form-row">
                        <label className="text-muted">Title</label>
                        <input onChange={this.handleChange("title")} type="text" className="form-control text-center" value={title} />

                    </div>

                    <div className="form-group form-row">
                        <label className="text-muted">body</label>
                        <textarea onChange={this.handleChange("body")} type="text" className="form-control text-center" value={body} />

                    </div>

                    <div className="form-group form-row">
                        <label className="text-muted">Profile picture</label>
                        <input onChange={this.handleChange("photo")} accept="image/*" type="file" className="form-control-file" id="formControlFile1"/>
                    </div>



                </div>



                <div className="card-footer text-muted">
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary" >Create post</button>
                </div>
            </div>


        </form>


    );


    render() {

        const {title, body , photo, user, error, redirectToProfile} = this.state ;

        if (redirectToProfile) {

            return <Redirect to={`/user/${user._id}`}/> ;
        }




        return(
            <div className="container">

                <div className="alert bg-danger mb-sm-1" role="alert" style = {{display : error ? "":"none"}}>
                    {error}
                </div>



                {this.newPostForm(title, body)}



            </div>



        );


    }
}

export default NewPost ;