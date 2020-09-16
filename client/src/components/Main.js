import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import About from './About';
import * as Constant from './Constants';
import axios from 'axios';

// require('dotenv').config();
const url = Constant.API_URL;

export class Main extends Component {
    state = {
        isLoggedIn: false,
        errors: {
          usernameErr: '',
          passwordErr: '',
          loginErr: ''
        }
      };
    
      componentDidMount() {
        if (Constant.token) {
          this.setState({
            isLoggedIn: true
          });
          this.props.history.push("/home");
        }
      }
      
      login = (event) => {
        event.preventDefault();
        const { username, password } = event.target;
        
        const errors = this.validate(username.value, password.value);
        if (errors.usernameErr || errors.passwordErr) {
          this.setState({ errors : errors });
          return;
        }

        const userObj = { username: username.value, password: password.value };
        console.log(url);
        axios
          .post(`${url}/login`, userObj)
          .then((response) => {
            console.log(response);
            if (response.data) {
              localStorage.setItem('jwt_token', response.data.result.token);
              localStorage.setItem('username', response.data.result.username);
              localStorage.setItem('userId', response.data.result.userId);
              this.setState({
                isLoggedIn: true
              });
              this.props.history.push("/home");
            }else{
              // this.setState({
              //   loginErr : response.data.error
              // })
              console.log(response);  
            }
          })
          .catch((error) => {
            if (error.response) {
              this.setState({
                errors: {
                  loginErr : error.response.data.error
                }
              }) 
            }
            console.log(error.response);
          });
      };

      validate = (username, password) => {
        let errors = this.state.errors;
        errors.usernameErr = "";
        errors.passwordErr = "";
        errors.loginErr = "";
        const errorMessage = "This field is required";
        if (username.length === 0) {
          errors.usernameErr = errorMessage;
        }
        if (password.length === 0) {
          errors.passwordErr = errorMessage;
        }
        return errors;
      }

      render () {
        const { usernameErr, passwordErr, loginErr } = this.state.errors;
        return (
          <>
          <h1 className="main-welcome">Welcome!</h1>
          <div className="main-wrapper">
              <About />
              <form onSubmit={this.login} className="login__form">
                <label className="login__form-label">USER NAME</label><br/> 
                <input className="login__form-userName" type="text" name="username" placeholder="Enter Name" /><br/>
                {usernameErr && usernameErr.length > 0 && <label style={{color: 'red'}}>{usernameErr}</label>}
                <label className="login__form-label">ENTER PASSWORD</label><br/> 
                <input className="login__form-password" type="password" name="password" placeholder="Enter Password" /><br/>
                {passwordErr && passwordErr.length > 0 && <label style={{color: 'red'}}>{passwordErr}</label>}
                <div className="login__form-buttons">
                  <button className="login__form-btn" type="submit">Login</button>
                  {loginErr && loginErr.length > 0 && <label style={{color: 'white'}}>{loginErr}</label>}
                  <Link to='/signUp'><button className='login__signup-btn'>SignUp</button></Link>
                </div>
              </form>
            </div>
          </>
        )
      }

}

export default Main;
