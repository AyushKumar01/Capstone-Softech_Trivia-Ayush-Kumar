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
    
      // login = (e) => {
      // }
      
      // signup = (event) => {
      //   event.preventDefault();
      //   console.log(this.signUpForm);
      //   const { name, username, password } = event.target;
    
      //   const userObj = {
      //     name: name.value,
      //     username: username.value,
      //     password: password.value
      //   };
      //   axios
      //   .post('http://localhost:5000/signup', userObj)
      //   .then((response) => {
      //     console.log('signup response', response);
      //     this.setState({
      //       isSignedUp: true,
      //     });
      //   })
      //   .catch((err) => console.log(err));
      // };
    
      // signup = (e) => {
      // }
    
      // renderSignUp() {
      //   return (
      //     <div>
      //       <h1>SignUp</h1>
      //       <form onSubmit={this.signup}>
      //       {/* <form ref={form => (this.signUpForm = form)}> */}
      //         <div className='form-group'>
      //           Username: <input type='text' name='username' />
      //         </div>
      //         <div className='form-group'>
      //           Name: <input type='text' name='name' />
      //         </div>
      //         <div className='form-group'>
      //           Password: <input type='password' name='password' />
      //         </div>
      //         <button className='btn btn-primary'>Signup</button>
      //         {/* <button className='btn btn-primary' onClick={this.signup}>
      //           Signup
      //         </button> */}
      //       </form>
      //     </div>
      //   )
      // };
    
      // renderLogin = () => {
      //   const { isLoginError, errorMessage } = this.state
      //   return (
      //     <div className="main-wrapper">
      //       {isLoginError && <label style={{color: 'red'}}>{errorMessage}</label>}
      //       {/* <form onSubmit={this.login}>
      //           <div className='form-group'>
      //             Username: <input type='text' name='username' />
      //           </div>
      //           <div className='form-group'>
      //             Password: <input type='password' name='password' />
      //           </div>
      //           <button className='btn btn-primary'>LogIn</button>
      //       </form> */}
      //         <div className="main-about">
      //             <div className="main-about__logo">
      //               <div className="main-about__logo-image"></div>
      //               <img className="main-about__icon" src={logo} alt="logo" />
      //             </div>
      //             <div  className="main-about__descriptions">
      //                 <p className="main-about__descriptions-text">Your brain is your most valuable tool — 
      //                     you use it every day to solve problems, 
      //                     make decisions, and navigate our complex world. 
      //                     But how well do you really know your own mind? 
      //                     And what kind of thinker are you?<br></br>
      //                     Let's play !
      //                   </p>
      //             </div>
      //             {/* <div className="main-comment">
      //                 <div className="main-comment__top">
      //                     <p className="main-comment__name">NAME</p>
      //                     <p className="main-comment__time">TIME</p>
      //                 </div>
      //                 <div className="main-comment__bottom">
      //                     Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      //                     Doloribus repellat nulla deserunt, vitae eos aliquid facilis 
      //                     cupiditate iste, delectus quasi corrupti quaerat in.
      //                 </div>
      //             </div> */}
      //         </div>
      //         <form  onSubmit={this.login} className="login__form">
      //           <label className="login__form-label">USER NAME</label><br/> 
      //           <input className="login__form-userName" type="text" name="username" placeholder="Enter Name" /><br/>
      //           <label className="login__form-label">ENTER PASSWORD</label><br/> 
      //           <input className="login__form-password" type="password" name="password" placeholder="Enter Password" /><br/>
      //           <button className="login__form-btn" type="submit">Login</button>
      //         </form>
      //         <Link><button className='login__signup-btn'>SignUp</button></Link>
      //     </div>
      //   )
      // };
    
      render () {
        // const { isLoggedIn, isSignedUp } = this.state;
    
        // // Handle the Signup/Login
        // // if(!isSignedUp) return this.renderSignUp()
        // if(!isLoggedIn) return this.renderLogin();
    
        // return (
        //   // <div className='App'>
        //     <Category />
        //   // </div>
        // )
        const { isLoginError, errorMessage } = this.state
        return (
          <div className="main-wrapper">
              <About />
              <form onSubmit={this.login} className="login__form">
                <label className="login__form-label">USER NAME</label><br/> 
                <input className="login__form-userName" type="text" name="username" placeholder="Enter Name" /><br/>
                <label className="login__form-label">ENTER PASSWORD</label><br/> 
                <input className="login__form-password" type="password" name="password" placeholder="Enter Password" /><br/>
                <button className="login__form-btn" type="submit">Login</button>
                {isLoginError && <label style={{color: 'red'}}>{errorMessage}</label>}
              </form>
              <Link to='/signUp'><button className='login__signup-btn'>SignUp</button></Link>
          </div>
        )
      }

    // render() {
    //     return (
    //         <div>
    //             <h1>sign up</h1>
    //         </div>
    //     )
    // }
}


// class Profile extends Component {
//     state = {
//       isLoading: true,
//       userInfo: {}
//     }
    
//     componentDidMount() {
//       // here grab token from localStorage
//       const token = localStorage.getItem('jwt_token');
//       console.log(token);
//       axios
//         .get('http://localhost:5000/profile', {
//           headers: {
//             authorization: `BEARER ${token}`,
//           },
//         })
//         .then((response) => {
//           console.log(response);
//           this.setState({
//             isLoading: false,
//             userInfo: response.data,
//           });
//         })
//         .catch((err) => console.log(err));
//     }
//     render() {
//       const { isLoading, userInfo } = this.state;
//       return isLoading ? <h1>Loading...</h1> : <h1>Welcome {userInfo.name}!</h1>;
//     }
//     // componentWillMount() {
//     //   // here grab token from localStorager 
//     // }
//     // render() {
//     //   const { isLoading, userInfo } = this.state
//     //   return (isLoading ? <h1>Loading...</h1> : <h1>Welcome {userInfo.name}!</h1>)
//     // }
//   }

export default Main;
