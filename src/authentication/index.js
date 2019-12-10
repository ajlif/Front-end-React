

// make a post request : using fetch , its used by default in the browsers .no need to installation


export const signup = user => {

    return fetch(`${process.env.REACT_APP_API_URL}/signup`,{
        method:"POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(user)
    }).then(response => {
        return response.json();
    }).catch(err => console.log("Error while Sigup : ", err)) ;
};




// make a post request : using fetch , its used by default in the browsers .no need to installation
export const signin = user => {
    return fetch(`${process.env.REACT_APP_API_URL}/signin`,{
        method:"POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(user)
    }).then(response => {
        return response.json();
    }).catch(err => console.log("Error while Signin : ", err)) ;
};


//parameters : jwttoken and a callback function
export const authenticate = (jwt, next) => {
    if (typeof window !== "undefined"){  // check window is available : sometime when component is rendering or is mounting..the window could not be available yet
        localStorage.setItem("jwt", JSON.stringify(jwt));

        // now handle the callback method
        next();
    }

};





// sign out and redirect user to login page
// take a function as an argoment
export const signout = (next) =>{
    //client side
    if(typeof window != "undefined") localStorage.removeItem("jwt");
    next();

    // server side
    return fetch(`${process.env.REACT_APP_API_URL}/signout` , {
        method : "GET"

    })
        .then(response => {
            console.log("Signout",response);
            return response.json()
        })
        .catch(err => console.log(err));


};

// verify if the user is autheticated or not using jwt
export const isAuthenticated = () => {
    if(typeof window == "undefined"){
        return false;
    }
    if (localStorage.getItem("jwt")){

        return JSON.parse(localStorage.getItem("jwt")); // get the inf from local storage ,(the name in the menu will be shown from local storage).
    }
    else{
        return false;
    }
};


export const forgotPassword = email => {
    console.log("email: ", email);
    return fetch(`${process.env.REACT_APP_API_URL}/forgot-password/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    })
        .then(response => {
            console.log("forgot password response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const resetPassword = resetInfo => {
    return fetch(`${process.env.REACT_APP_API_URL}/reset-password/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(resetInfo)
    })
        .then(response => {
            console.log("reset password response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};


export const socialLogin = user => {
    return fetch(`${process.env.REACT_APP_API_URL}/social-login/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        // credentials: "include", // works only in the same origin
        body: JSON.stringify(user)
    })
        .then(response => {
            console.log("signin response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};


