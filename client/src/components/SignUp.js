import React, { Component } from 'react';
import About from './About';
import axios from 'axios';
import * as Constant from './Constants';
require('dotenv').config();

const url = Constant.API_URL;

export class SignUp extends Component {
    state = {
      errors: {
        firstNameErr: '',
        lastNameErr: '',
        usernameErr: '',
        emailErr: '',
        passwordErr: '',
        signupErr: ''
      }
    };
    
    componentDidMount() {
      if (Constant.token) {
        this.props.history.push("/home");
      }
    }

    signup = (event) => {
    event.preventDefault();
    const { firstName, lastName, username, email, password } = event.target;

    const errors = this.validate(firstName.value, lastName.value, email.value, username.value, password.value);
    if (errors.firstNameErr || errors.lastNameErr || errors.emailErr || errors.usernameErr || errors.passwordErr) {
      this.setState({ errors : errors });
      return;
    }

    const userObj = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        username: username.value,
        password: password.value
    };
    axios
    .post(`${url}/login/signup`, userObj
    )
    .then((response) => {
        console.log('signup response', response);
        this.props.history.push("/");
    })
    .catch((error) => {
      if (error.response) {
        this.setState({
          errors: {
            signupErr : error.response.data.error
          }
        }) 
      }
      console.log(error.response);
    });
    };

    validate = (firstName, lastName, email, username, password) => {
      let errors = this.state.errors;
      errors.firstNameErr = ""; errors.lastNameErr = ""; errors.emailErr = ""; errors.usernameErr = ""; errors.passwordErr = "";
      const errorMessage = "*This field is required";
      if (firstName.length === 0) {
        errors.firstNameErr = errorMessage;
      }
      if (lastName.length === 0) {
        errors.lastNameErr = errorMessage;
      }
      if (email.length === 0) {
        errors.emailErr = errorMessage;
      }else{
        errors.emailErr = Constant.validEmailRegex.test(email) ? '' : 'Email is not valid!';
      }
      if (username.length === 0) {
        errors.usernameErr = errorMessage;
      }
      if (password.length === 0) {
        errors.passwordErr = errorMessage;
      }
      return errors;
    }

    render() {
      const { firstNameErr, lastNameErr, emailErr, usernameErr, passwordErr, signupErr } = this.state.errors;
       return (
          <div className="main-wrapper main-wrapper-signUp">
            <About />
            <form onSubmit={this.signup} className="login__form">
              <label className="login__form-label">FIRST NAME</label><br/> 
              <input className="login__form-userName" type="text" name="firstName" placeholder="Enter Name" /><br/>
              {firstNameErr && firstNameErr.length > 0 && <label style={{color: 'red'}}>{firstNameErr}</label>}<br/>
              <label className="login__form-label">LAST NAME</label><br/> 
              <input className="login__form-userName" type="text" name="lastName" placeholder="Enter Name" /><br/>
              {lastNameErr && lastNameErr.length > 0 && <label style={{color: 'red'}}>{lastNameErr}</label>}<br/>
              <label className="login__form-label">USER NAME</label><br/> 
              <input className="login__form-userName" type="text" name="username" placeholder="Enter Name" /><br/>
              {usernameErr && usernameErr.length > 0 && <label style={{color: 'red'}}>{usernameErr}</label>}<br/>
              <label className="login__form-label">EMAIL</label><br/> 
              <input className="login__form-userName" type="text" name="email" placeholder="Enter Name" /><br/>
              {emailErr && emailErr.length > 0 && <label style={{color: 'red'}}>{emailErr}</label>}<br/>
              <label className="login__form-label">ENTER PASSWORD</label><br/> 
              <input className="login__form-password" type="password" name="password" placeholder="Enter Password" /><br/>
              {passwordErr && passwordErr.length > 0 && <label style={{color: 'red'}}>{passwordErr}</label>}<br/>
              <div className="login__form-buttons">
                <button className="login__form-btn" type="submit">SignUp</button>
                {signupErr && signupErr.length > 0 && <label style={{color: 'red'}}>{signupErr}</label>}
                </div>
            </form>
          </div>
        )
      };
}

export default SignUp;
