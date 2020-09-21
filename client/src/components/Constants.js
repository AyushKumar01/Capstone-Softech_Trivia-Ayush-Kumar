export const API_URL = "http://localhost:5000";

//get username from local storage
export const getUsername = () => {
    let username = "";
    if (localStorage.getItem('username')) {
        username = localStorage.getItem('username');
    }
    return username;
}

//get user id from local storage
export const getUserId = () => {
    let userId = "";
    if (localStorage.getItem('userId')) {
        userId = localStorage.getItem('userId');
    }
    return userId;
}

//logout user
export const logoutUser = (showAlert, errorMessage) => {
    if(showAlert) alert(errorMessage);
    
    if (localStorage.getItem('userId')) {
        localStorage.removeItem('userId');
    }
    if (localStorage.getItem('username')) {
        localStorage.removeItem('username');
    }
    if (localStorage.getItem('jwt_token')) {
        localStorage.removeItem('jwt_token');
    }
    window.location.href = '/';
}

export const validEmailRegex = RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);

//get token from local storage
export function getToken(){
    return localStorage.getItem('jwt_token');
} 

//verify api response and based on response show error message
export function verifyResponse(error){
    if(error){
        if(error.name === "TokenExpiredError"){
            logoutUser(true, "Session expired");
        }else if(error.name === "JsonWebTokenError"){
           logoutUser(true, "Either the token is blank or there is any error with the token");
        }
    }
}

export function checkToken(){
    if (!localStorage.getItem('jwt_token')) {
        window.location.href = '/';
    }
}