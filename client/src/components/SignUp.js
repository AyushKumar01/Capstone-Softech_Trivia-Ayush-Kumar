import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Category from './Category';
import logo from '../assets/images/logohit.png';
import axios from 'axios';
require('dotenv').config();

const API_URL = process.env.API_URL || "http://localhost:5000";

export class SignUp extends Component {
    state = {
        isSignedUp: false
      };
    
      componentDidMount() {
        // if (localStorage.getItem('jwt_token')) {
        //   this.setState({
        //     isSignedUp: true,
        //     isLoggedIn: true,
        //   });
        // }
      }
    
    signup = (event) => {
    event.preventDefault();
    console.log(this.signUpForm);
    const { firstName, lastName, email, password } = event.target;

    const userObj = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value
    };
    axios
    .post('http://localhost:5000/signup', userObj)
    .then((response) => {
        console.log('signup response', response);
        this.setState({
            isSignedUp: true
        });
    })
    .catch((err) => console.log(err));
    };

    render() {
        return (
          <div>
            <h1>SignUp</h1>
            <form onSubmit={this.signup}>
            {/* <form ref={form => (this.signUpForm = form)}> */}
              <div className='form-group'>
                firstName: <input type='text' name='firstName' />
              </div>
              <div className='form-group'>
                lastName: <input type='text' name='lastName' />
              </div>
              <div className='form-group'>
                email: <input type='text' name='email' />
              </div>
              <div className='form-group'>
                Password: <input type='password' name='password' />
              </div>
              <button className='btn btn-primary'>Signup</button>
              {/* <button className='btn btn-primary' onClick={this.signup}>
                Signup
              </button> */}
            </form>
          </div>
        )
      };
}

export default SignUp;
