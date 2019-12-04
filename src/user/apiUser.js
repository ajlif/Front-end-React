// not a component , there are some helpers method to the user component


// make a request to backend
export const read = (userId, token) => {

    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}` , {
        method : "GET",
        headers : {
            Accept: "application/json",
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    })

        .then(response =>{ return response.json()})
        .catch(err => console.log(err));

};

// get users list
export const list =() => {

    return fetch(`${process.env.REACT_APP_API_URL}/users` , {
        method : "GET",

    })

        .then(response =>{ return response.json()})
        .catch(err => console.log(err));


};

// remove user
export const remove =(userId, token) => {

    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}` , {
        method : "DELETE",
        headers : {
            Accept: "application/json",
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    })

        .then(response =>{ return response.json()})
        .catch(err => console.log(err));

};


// update user informations
export const update = (userId, token , userData) => {
    console.log("user data update ", userData);
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}` , {
        method : "PUT",
        headers : {
            Accept: "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : userData   // type userData : no need to JSON stringify
    })

        .then(response =>{ return response.json()})
        .catch(err => console.log(err));

};

// update user informations ,i add it to change the user-name in the navbar when the name is updated.
// because the name is taken from the local storage which contain the old value
// so i take the new value , and update the local storage with the new value

export const updateUser = (user, next) => {
    // check if the window available
    if(typeof window !== "undefined"){
        if(localStorage.getItem("jwt")){
            let auth =JSON.parse(localStorage.getItem("jwt"));  // jwt has 2 propperties: token and user
            auth.user = user ;
            localStorage.setItem("jwt", JSON.stringify(auth));
            next();

        }
    }
};


// follow method
export const follow = (userId, token , followId) => {

    return fetch(`${process.env.REACT_APP_API_URL}/user/follow` , {
        method : "PUT",
        headers : {
            Accept: "application/json",
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : JSON.stringify({userId,followId})
    })

    // the response is handled in clickFollowButton in Profile.js , no need to handle it here
        .then(response =>{ return response.json()})
        .catch(err => console.log(err));

};


// unfollow method
export const unFollow = (userId, token , unfollowId) => {

    return fetch(`${process.env.REACT_APP_API_URL}/user/unfollow` , {
        method : "PUT",
        headers : {
            Accept: "application/json",
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : JSON.stringify({userId,unfollowId})
    })

    // the response is handled in clickFollowButton in Profile.js , no need to handle it here
        .then(response =>{ return response.json()})
        .catch(err => console.log(err));

};

// find people
export const findPeople = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/findpeople/${userId}` , {
        method : "GET",
        headers : {
            Accept: "application/json",
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    })

    
        .then(response =>{ return response.json()})
        .catch(err => console.log(err));
};


