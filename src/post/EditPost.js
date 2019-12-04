import React , {Component} from "react";
import {isAuthenticated} from "../authentication";
import {update, singlePost} from "./apiPost";
import {Redirect} from "react-router-dom";
import DefaultPostPicture from "../images/No-Image-Available.jpg";


class EditPost extends Component{

    constructor() {
        super();
        this.state = {
            id : "",
            title :"",
            body : "",
            redirectToProfile : false ,
            error : "",
            photo : "",
            fileSize : 0
        }}

    // the logic of componentDidMount
    init =  postId => {
        //const token = isAuthenticated().token ;
        singlePost(postId).then(data => {
            if(data.error) {
                this.setState({error: data.error});
            }
            else
            {
                this.setState(
                    {
                        id:data._id,
                        title :data.title,
                        body: data.body,
                        photo : "",
                        error : ""

                    });}

        });

    };



    componentDidMount() {


        // to send the data( profile pict)  : use FormData api
        this.postData = new FormData() ;
        const postId = this.props.match.params.postId ;
        this.init(postId);
    }


    // function inside function
    handleChange = name => event => {

        // grab the first file if the handlechange('photo') , else grab the name
        const value= name === 'photo' ? event.target.files[0] : event.target.value;

        const fileSize = name === 'photo' ? event.target.files[0].size : 0;
        this.postData.set(name, value);
        this.setState({[name] : value, fileSize}); // write : fileSize:fileSize  or fileSize

        // clear the error when the user is writing
        this.setState({error : ""}) ;


    };

    clickSubmit = event => {
        // by default when click button , the page reload to avoid this :
        event.preventDefault();

        if (this.isValid()){

            const postId  = this.state.id ;
            const token = isAuthenticated().token ;

            console.log("this is data : ");
            console.log(this.postData);
            // this.userData is was user , before adding photo modification in Edit profile
            update(postId, token, this.postData).then(data => {
                if (data.error) this.setState({ error: data.error });

                else{
                    console.log("post updated successfully : ", data);
                    this.setState({
                        title: "",
                        body: "",
                        redirectToProfile: true
                    });

                }
            });
        }
    };

    // check if inputs are valid
    isValid =() => {
        const {title, body, fileSize} = this.state ;

        if (body.length === 0 || title.length === 0 ){
            this.setState({error : "title and body are required"});
            return false;
        }

        if (fileSize > 1000000 ){
            this.setState({error : "file size should be < 1 MB "});
            return false;
        }

        // if no errors
        return true;

    };




        editForm = (title, body, photoURL) => (

        <form >
            <div className="card text-center ">
                <div className="card-header">
                    <h4 className="mt-3">Update post</h4>
                </div>


                <div className="card-body m-4">
                    <div className="form-group form-row">
                        <label className="text-muted">Title</label>
                        <input onChange={this.handleChange("title")}  type="text" className="form-control text-center" value={title} />

                    </div>

                    <div className="form-group form-row">
                        <label className="text-muted">Body</label>
                        <textarea onChange={this.handleChange("body")}  type="text" className="form-control text-center" value={body} />

                    </div>


                    <div className=" col form-group form-row">
                        <label className="text-muted">Post picture</label>
                        <input onChange={this.handleChange("photo")} accept="image/*" type="file" className="form-control-file" id="formPostControlFiled"/>
                    </div>
                    <div className="form-group form-row">
                        <img
                            src={photoURL}
                            alt={this.state.name}
                            onError={img => (img.target.src = `${photoURL}`)}
                            style={{width:'10%', height:'10%', objectFit:'cover'}} />
                    </div>


                    <div className="card-footer text-muted">
                        <button onClick={this.clickSubmit} className="btn btn-raised btn-primary" >Update</button>
                    </div>

                </div>

            </div>


        </form>


    );


    render() {
        const {id, title , body , redirectToProfile, error} = this.state ;
        const photoURL = id ? `${process.env.REACT_APP_API_URL}/post/photo/${id}?${new Date().getTime()}`: DefaultPostPicture ;

        if (redirectToProfile) {

            return <Redirect to={`/post/${id}`}/>
        }

        return (

            <div className="container">

                <div className="alert bg-danger mb-sm-1" role="alert" style = {{display : error ? "":"none"}}>
                    {error}
                </div>

                {this.editForm(title , body, photoURL)}



            </div>
        );
    }
}

export default EditPost ;