import React , {Component} from 'react' ;
import {list} from './apiUser';
import DefaultProfilePicture from "../images/User_Avatar.png" ;
import {Link} from "react-router-dom";

class Users extends Component{

     constructor(){
         super();
         this.state = {
             users : []
         }
     }


     componentDidMount() {
         // list is a funtion in (apiUser) that return list of users ,i handle it here by then
         list().then(data => {

             data.error ? console.log(data.error) : this.setState({users : data}) ;

             });
     }

     // return all users.  () = {return ..}
     renderUsers = (users) => (
         <div className="row">
             {users.map((user, index) => // use =>(..) or =>{return ..}
                 (


                  // react ask to have a unique key for rendered element
                 <div className="card col-md-4" style={{margin: "5px"}} key={index}>


                     {/*
                     <img
                     className="card-img-top"
                     src={DefaultProfilePicture}
                     alt={user.name}
                     style={{width:'100%', height:'15vw', objectFit:'cover'}}/>
                     */}

                     <img
                         src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                         onError={img => (img.target.src = `${DefaultProfilePicture}`)}
                         alt={user.name}
                         style={{width:'60%', height:'60%', objectFit:'cover'}} />




                     <div className="card-body">
                 <h5 className="card-title">{user.name}</h5>
                 <p className="card-text">{user.email}</p>
                 <Link
                     to={`/user/${user._id}`}
                     className="btn btn-raised btn-info">Profile
                 </Link>
                 </div>
                 </div>




                 ))}
         </div>
 );


     render() {
         const {users} = this.state ;

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Users</h2>

                {this.renderUsers(users)}

            </div>
        );


    }

}

export default Users ;