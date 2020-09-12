import React, { Component } from 'react';
import About from './About';
import axios from 'axios';
require('dotenv').config();

// const API_URL = process.env.API_URL || "http://localhost:5000";

export class SignUp extends Component {
   
    signup = (event) => {
    event.preventDefault();
    const { firstName, lastName, username, email, password } = event.target;

    const userObj = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        username: username.value,
        password: password.value
    };
    axios
    .post('http://localhost:5000/login/signup', userObj)
    .then((response) => {
        console.log('signup response', response);
        this.props.history.push("/");
    })
    .catch((err) => console.log(err));
    };

    render() {
       return (
          <>
          <h1 className="main-welcome">Welcome!</h1>
          <div className="main-wrapper">
            <About />
             <form onSubmit={this.signup} className="login__form">
                <label className="login__form-label">FIRST NAME</label><br/> 
                <input className="login__form-userName" type="text" name="firstName" placeholder="Enter Name" /><br/>
                <label className="login__form-label">LAST NAME</label><br/> 
                <input className="login__form-userName" type="text" name="lastName" placeholder="Enter Name" /><br/>
                <label className="login__form-label">USER NAME</label><br/> 
                <input className="login__form-userName" type="text" name="username" placeholder="Enter Name" /><br/>
                <label className="login__form-label">EMAIL</label><br/> 
                <input className="login__form-userName" type="text" name="email" placeholder="Enter Name" /><br/>
                <label className="login__form-label">ENTER PASSWORD</label><br/> 
                <input className="login__form-password" type="password" name="password" placeholder="Enter Password" /><br/>
                <div  className="login__form-buttons">
                  <button className="login__form-btn" type="submit">SignUp</button>
                </div>
              </form>
          </div>
          </>
        )
      };
}

export default SignUp;
