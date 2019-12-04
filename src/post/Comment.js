import React , {Component} from 'react';
import {comment, remove, singlePost, uncomment} from "./apiPost";
import {isAuthenticated} from "../authentication";
import {Link, Redirect} from "react-router-dom";
import DefaultProfilePicture from "../images/User_Avatar.png";

class Comment extends Component {

    state = {
        text : "",
        error : ""
    };

    handleChange = event => {
        this.setState({error :""});
        this.setState({text : event.target.value });
    };

    isValid = () =>{
        const {text} = this.state ;
        if (!text.length > 0  || text.length > 150){
            this.setState({error : "comment is too short or too long"});
            return false ;
        }
        return true ;
    };

    addComment = event => {
        event.preventDefault();
        if (!isAuthenticated()){
            this.setState({error : "please sign in to write a comment"});
            return false ;
        }

        if(this.isValid()){

            const userId = isAuthenticated().user._id ;
            const token = isAuthenticated().token ;
            const postId = this.props.postId ;
            const newcomment ={text : this.state.text} ;

            comment(userId, token, postId, newcomment)                       // i added this
                .then(data => {
                    if(data.error){
                        console.log(data.error)
                    }
                    else {
                        this.setState({text : ""});

                        // dispatch fresh list of comments to SinglePost
                        this.props.updateComments(data.comments) ;
                    }
                })
        }


    };


    deleteConfirmed = comment =>{
        let answer = window.confirm("you want to delete this comment ?") ;
        if (answer){
            this.deleteComment(comment);
        }


    };

    deleteComment = comment => {
        const userId = isAuthenticated().user._id ;
        const token = isAuthenticated().token ;
        const postId = this.props.postId ;

        uncomment(userId, token, postId, comment)                       // i added this
            .then(data => {
                if(data.error){
                    console.log(data.error)
                }
                else {
                    this.props.updateComments(data.comments) ;
                }
            })
    };


    render() {
        const {comments} = this.props ;
        const {error} = this.state ;
        return (

            <div className="container">

                <div className="alert bg-danger mb-sm-1" role="alert" style = {{display : error ? "":"none"}}>
                    {error}
                </div>


            <div className="col-md-8">
                <form onSubmit={this.addComment}>
                    <div className="form-group form-row">
                        <input onChange={this.handleChange}  type="text" value={this.state.text} className="form-control text-center" placeholder=" write a comment" required/>
                    </div>
                </form>

                {JSON.stringify(comments)}
                <hr/>


                <div className="col-md-8">
                    <h3 >
                        ({comments.length}) Comments
                    </h3>
                    <hr />
                    {comments.map((comment, i) => (

                        <div key={i}>
                            <div>
                                <Link to={`/user/${comment.postedBy._id}`}>
                                    <img
                                        style={{
                                            borderRadius: "50%",
                                            border: "1px solid black"
                                        }}
                                        className="float-left mr-2"
                                        height="30px"
                                        width="30px"
                                        onError={i =>
                                            (i.target.src = `${DefaultProfilePicture}`)
                                        }
                                        src={`${process.env.REACT_APP_API_URL
                                        }/user/photo/${comment.postedBy._id}`}
                                        alt={comment.postedBy.name}
                                    />
                                </Link>
                                <div>
                                        <div className="row">
                                            <div className="col">
                                                <h3>{comment.postedBy.name}</h3>
                                            </div>
                                            <span>

                                                {
                                                    isAuthenticated().user && comment.postedBy && isAuthenticated().user._id === comment.postedBy._id &&
                                                    <>

                                                        <Link
                                                            onClick={() => this.deleteConfirmed(comment)}
                                                            className="fas fa-trash-alt text-danger">
                                                        </Link>
                                                    </>
                                                }

                                            </span>

                                        </div>
                                        <h5>
                                            {comment.text}
                                        </h5>
                                        <div className="col">
                                            <i className="fas fa-clock text-success bg-white"></i>{" "}
                                            <small>{comment.created}</small>
                                        </div>
                                        <hr/>

                                    </div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
            </div>
        );

    }
}

export default Comment ;