import React, { Component } from 'react';
import LogOutBtn from './LogOutBtn';
import * as Constant from './Constants';
import axios from 'axios';
const url = Constant.API_URL;
class Score extends Component {
    state = {
        errors: {
          CommentErr: ''
        }
      };

    commentSubmit = (event) => {
        event.preventDefault();
        const comment = event.target.comment.value;
    
        const errors = this.validate(comment);
        if (errors.commentErr) {
          this.setState({ errors : errors });
          return;
        }

        const userObj = {
            username: Constant.getUsername(),
            comment: comment
        };
        axios
        .post(`${url}/comment`, userObj, {
            headers: {
              authorization: `${Constant.token}`
            }})
        .then((response) => {
            console.log('comment response', response);
            this.props.history.push("/home");
        })
        .catch((err) => console.log(err));
    };

    validate = (comment) => {
        let errors = this.state.errors;
        errors.commentErr = "";
        const errorMessage = "This field is required";
        if (comment.length === 0) {
          errors.commentErr = errorMessage;
        }
        return errors;
    }
    
    render() {
        const score = this.props.location.aboutProps && this.props.location.aboutProps.score;
        console.log(this.props.location.aboutProps);
        const { commentErr } = this.state.errors;
        let username = Constant.getUsername();
        return (
            <div className="final-wrapper">
                <div className="final__score">
                     <h1 className="final__score-username">{username}</h1>
                    <div className="final__score-upper">
                        <h1 className="final__score-text">Your Score Is</h1>
                        <h2 className="final__score-count">[{score}]</h2>
                        <div className="final__score-btn">
                            <button className="final__score-playAgain">PLAY AGAIN</button>
                            <LogOutBtn  className="final__score-logOut" text="Log Out" />
                        </div>
                    </div>
                    <div className="final__score-lower">
                        <div className="final__score-icon"><i className='fas fa-thumbs-up'></i></div>
                        <div className="final__score-greet">Great job</div>
                    </div>
                </div>
                <form className="comment__form" onSubmit={this.commentSubmit}>
                    <div className="comment__form-label"><i className='fas fa-hand-point-down'></i>ANY COMMENT ABOUT QUIZ</div><br/> 
                    <textarea className="comment__form-comment" type="text" name="comment" placeholder="Enter COMMENT" /><br/>
                    {commentErr && commentErr.length > 0 && <label style={{color: 'red'}}>{commentErr}</label>}
                    <button className="comment__form-btn" type="submit">COMMENT</button>
                </form>
            </div>
        )
    }

    // getUsername() {
    //     let username = "";
    //     if (localStorage.getItem('username')) {
    //         username = localStorage.getItem('username');
    //     }
    //     return username;
    // }
}

export default Score;
