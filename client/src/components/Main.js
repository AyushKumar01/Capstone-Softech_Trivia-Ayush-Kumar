import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import About from './About';
// import Category from './Category';
import axios from 'axios';
require('dotenv').config();

const API_URL = process.env.API_URL || "http://localhost:5000";

export class Main extends Component {
    state = {
        isSignedUp: false,
        isLoggedIn: false,
        isLoginError: false,
        errorMessage: ''
      };
    
      componentDidMount() {
        if (localStorage.getItem('jwt_token')) {
          this.setState({
            isSignedUp: true,
            isLoggedIn: true,
          });
        }
      }
    
      
      login = (event) => {
        event.preventDefault();
        const { username, password } = event.target;
        const userObj = { username: username.value, password: password.value };
        console.log(API_URL);
        axios
          .post(`${API_URL}/login`, userObj)
          .then((response) => {
            console.log(response);
            if (!response.data.error) {
              localStorage.setItem('jwt_token', response.data.token);
              this.setState({
                isLoggedIn: true
              });
              this.props.history.push("/Category");
            }else{
              this.setState({
                errorMessage : response.data.error,
                isLoginError : true
              })  
            }
          })
          .catch((err) => {
            console.log(err)
          });
      };
    
      render () {
        const { isLoginError, errorMessage } = this.state
        return (
          <>
          <h1 className="main-welcome">Welcome!</h1>
          <div className="main-wrapper">
              <About />
              <form onSubmit={this.login} className="login__form">
                <label className="login__form-label">USER NAME</label><br/> 
                <input className="login__form-userName" type="text" name="username" placeholder="Enter Name" /><br/>
                <label className="login__form-label">ENTER PASSWORD</label><br/> 
                <input className="login__form-password" type="password" name="password" placeholder="Enter Password" /><br/>
                <div  className="login__form-buttons">
                  <button className="login__form-btn" type="submit">Login</button>
                  {isLoginError && <label style={{color: 'red'}}>{errorMessage}</label>}
                  <Link to='/signUp'><button className='login__signup-btn'>SignUp</button></Link>
                </div>
              </form>
            </div>
          </>
        )
      }

}

export default Main;
