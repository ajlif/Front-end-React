import React , {Component} from 'react';
import {list} from './apiPost';
import defaultPostPicture from "../images/laptop.jpg" ;
import {Link} from "react-router-dom";

class Posts extends Component{

    constructor(){
        super();
        this.state = {
            posts : []
        }
    }


    componentDidMount() {
        // list is a funtion in (apiUser) that return list of users ,i handle it here by then
        list().then(data => {

            data.error ? console.log(data.error) : this.setState({posts : data}) ;

        });


    }

    // return all users.  () = {return ..}
    renderPosts = (posts) => {
        // use =>(..) or =>{return(...)}
        return(
            <div className="col">

                {posts.map((post, index) =>
                {
                        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
                        const posterName = post.postedBy ? post.postedBy.name : "Anonymous poster";


                        return (

                            // react ask to have a unique key for rendered element
                            <div className="card text-white bg-dark mb-3" style={{margin: "35px"}} key={index}>


                                <div className="card-header">
                                    <h3 className="text-white">
                                        <Link
                                            to={`${posterId}`}
                                            className = "text-white">
                                            {posterName}
                                        </Link>
                                    </h3>
                                    <p className="text-secondary">{new Date(post.created).toDateString()}</p>
                                </div>

                                <div className="card-body">
                                    <p className="card-title">{post.title}</p>
                                    <p className="card-text">{post.body.substring(0,250)}...</p>

                                    <img
                                        src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                                        onError={img => (img.target.style.display = 'none')}

                                        style={{width:'50%', height:'50%', objectFit:'cover'}}
                                    />

                                    <Link
                                        to={`/post/${post._id}`}
                                        className="btn btn-raised btn-info">Read more
                                    </Link>
                                </div>
                            </div>

                        );




                })}
            </div>
        )

    };


    render() {
        const {posts} = this.state ;

        return (
            <div className="container">

                <div className="p-3 mb-2 bg-info text-white" role="alert" style = {{display  : !posts.length ? "":"none"}}>
                    Loading ...
                </div>

                {this.renderPosts(posts)}

            </div>
        );


    }

}

export default Posts ;