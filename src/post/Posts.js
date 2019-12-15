import React , {Component} from 'react';
import {list} from './apiPost';
import defaultPostPicture from "../images/laptop.jpg" ;
import {Link} from "react-router-dom";

class Posts extends Component{

    constructor(){
        super();
        this.state = {
            posts : [],
            page: 1
        }
    }


    componentDidMount() {
        this.loadPosts(this.state.page);
    }


    loadPosts = page => {
        list(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });
            }
        });
    };


    loadMore = number => {
        this.setState({ page: this.state.page + number });
        this.loadPosts(this.state.page + number);
    };
 

    loadLess = number => {
        this.setState({ page: this.state.page - number });
        this.loadPosts(this.state.page - number);
    };

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
        const {posts, page} = this.state ;

        return (
            <div className="container">

                <div className="p-3 mb-2 bg-info text-white" role="alert" style = {{display  : !posts.length ? "":"none"}}>
                    Loading ...
                </div>

                {this.renderPosts(posts)}

                {page > 1 ? (
                        <button
                            className="center btn btn-raised btn-warning mr-5 mt-5 mb-5"
                            onClick={() => this.loadLess(1)}
                        >
                            Previous
                        </button>
                    ) : (
                        ""
                    )}
                    {page}
     
                {posts.length -1 ? (
                    <button
                        className=" btn btn-raised btn-success mt-5 mb-5"
                        onClick={() => this.loadMore(1)}
                    >
                        Next
                    </button>
                    ) : (
                        ""
                    )}

            </div>
        );


    }

}

export default Posts ;