export const API_URL = "http://localhost:5000";

export const getUsername = () => {
    let username = "";
    if (localStorage.getItem('username')) {
        username = localStorage.getItem('username');
    }
    return username;
}

export const getUserId = () => {
    let userId = "";
    if (localStorage.getItem('userId')) {
        userId = localStorage.getItem('userId');
    }
    return userId;
}

export const logoutUser = (showAlert) => {
    if(showAlert) alert("session expired");
    
    if (localStorage.getItem('userId')) {
        localStorage.removeItem('userId');
    }
    if (localStorage.getItem('username')) {
        localStorage.removeItem('username');
    }
    if (localStorage.getItem('jwt_token')) {
        localStorage.removeItem('jwt_token');
    }
}

export const validEmailRegex = RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);

export const token = localStorage.getItem('jwt_token');