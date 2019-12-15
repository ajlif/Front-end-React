

export const create = (userId, token , postData) => {


    return fetch(`${process.env.REACT_APP_API_URL}/post/new/${userId}` , {
        method : "POST",
        headers : {
            Accept: "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : postData   // type userData : no need to JSON stringify
    })

        .then(response =>{return response.json()})
        .catch(err => console.log(err));


};

// get posts list (modified to make pagination)
export const list = page => {

    return fetch(`${process.env.REACT_APP_API_URL}/posts/?page=${page}` , {
        method : "GET",

    })

        .then(response =>{ return response.json()})
        .catch(err => console.log(err));


};

// get single post
export const singlePost = postId => {

    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}` , {
        method : "GET",

    })

        .then(response =>{ return response.json()})
        .catch(err => console.log(err));


};


// get posts list by specific user
export const postsByUser = (userId, token) => {

    return fetch(`${process.env.REACT_APP_API_URL}/posts/by/${userId}` , {
        method : "GET",
        headers : {
            Accept: "application/json",
            'Content-Type' : 'application/json',
            "Authorization" : `Bearer ${token}`}

    })

        .then(response =>{ return response.json()})
        .catch(err => console.log(err));


};


// remove post
export const remove =(postId, token) => {

    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}` , {
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


// update post informations
export const update = (postId, token , postData) => {

    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}` , {
        method : "PUT",
        headers : {
            Accept: "application/json",        // be carreful with formData there is no Content-Type
            "Authorization" : `Bearer ${token}`
        },
        body : postData   // type userData : no need to JSON stringify
    })

        .then(response =>{ return response.json()})
        .catch(err => console.log(err));

};


export const like = (userId, token, postId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/like`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, postId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const unlike = (userId, token, postId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/unlike`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, postId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const comment = (userId, token, postId, comment) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/comment`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, postId, comment })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const uncomment = (userId, token, postId, comment) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/uncomment`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, postId, comment })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};