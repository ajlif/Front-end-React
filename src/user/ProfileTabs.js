import React , {Component} from 'react' ;
import {Link} from "react-router-dom";
import DefaultProfilePicture from "../images/User_Avatar.png";

class ProfileTabs extends Component {


    render() {
        const {following , followers, posts} = this.props ;
        return (
            <div>


                <div className="row">


                    <div className="col">
                        <h3>
                            Followers ({followers.length})
                        </h3>
                        <hr />
                        {followers.map((person, i) => (
                            <div key={i}>
                                <div>
                                    <Link to={`/user/${person._id}`}>
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
                                            }/user/photo/${person._id}`}
                                            alt={person.name}
                                        />
                                        <div>
                                            <p className="lead">
                                                {person.name}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="col">
                        <h3 >
                            Following ({following.length})
                        </h3>
                        <hr />
                        {following.map((person, i) => (
                            <div key={i}>
                                <div>
                                    <Link to={`/user/${person._id}`}>
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
                                            }/user/photo/${person._id}`}
                                            alt={person.name}
                                        />
                                        <div>
                                            <p className="lead">
                                                {person.name}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>






                    <div className="col-8">


                            <h3>Posts</h3>


                        <hr />
                        {posts.map((post, index) =>
                        {
                            const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
                            const posterName = post.postedBy ? post.postedBy.name : "Anonymous poster";


                            return (

                                // react ask to have a unique key for rendered element
                                <div className="card text-white bg-dark mb-3" style={{margin: "10px"}} key={index}>


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



                </div>
            </div>

        );

    }
}

export default ProfileTabs ;