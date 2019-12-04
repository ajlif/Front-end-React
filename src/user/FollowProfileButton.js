import React,{Component} from 'react';
import {follow, unFollow} from './apiUser';

class FollowProfileButton extends Component{

    followClick = () => {
        // will execute onButtonClick method which require another method (follow) in apiUser
        this.props.onButtonClick(follow);
    };

    unfollowClick = () => {
        // will execute onButtonClick method which require another method (follow) in apiUser
        this.props.onButtonClick(unFollow);
    };

    render() {

        return (
            <div className="d-inline-block mt-2">

                {!this.props.following ?
                    (<button type="button" onClick={this.followClick} className="btn btn-raised btn-info mr-2">Follow</button>
                    ): (
                        <button type="button" onClick={this.unfollowClick} className="btn btn-raised btn-warning">Unfollow</button>)
                }




            </div>
        );
    }

}

export default FollowProfileButton ;