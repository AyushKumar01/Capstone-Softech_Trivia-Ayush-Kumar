import React, { Component } from 'react';
import LogOutBtn from './LogOutBtn';
import * as Constant from './Constants';
import axios from 'axios';
import { Link } from 'react-router-dom';
const url = Constant.API_URL;
class Score extends Component {
    state = {
        errors: {
          CommentErr: ''
        }
      };

    componentDidMount() {
        Constant.checkToken();
    }

    commentSubmit = (event) => {
        event.preventDefault();
        const comment = event.target.comment.value;
    
        const errors = this.validate(comment);
        if (errors.commentErr) {
          this.setState({ errors : errors });
          return;
        }

        const userObj = {
            userId: Constant.getUserId(),
            username: Constant.getUsername(),
            comment: comment
        };
        axios
        .post(`${url}/api/comment`, userObj, {
            headers: {
              authorization: `BEARER ${Constant.getToken()}`
            }})
        .then((response) => {
            Constant.verifyResponse(response.error);
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
        const totalQuestion = this.props.location.aboutProps && this.props.location.aboutProps.totalQuestion;
        
        // const { score, totalQuestion } = this.props.location.aboutProps;
        
        let scoreImage = ""; let scoreResult = "";
        const percentage = score * 100 /totalQuestion;
        if(percentage < 50){
            scoreResult = "Better luck next time";
            scoreImage = 'fas fa-thumbs-down';
        }else if(percentage >= 50 && percentage < 80){
            scoreResult = "Keep it up";
            scoreImage = 'fas fa-thumbs-up';
        }else if(percentage >= 80 && percentage <= 100){
            scoreResult = "Awesome";
            scoreImage = 'fas fa-trophy';
        }else{
            scoreResult = "-----";
            scoreImage = 'fab fa-playstation';
        }
        
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
                            <Link to={"/category"}>
                                <button className="final__score-playAgain">PLAY AGAIN</button>
                            </Link>
                            <LogOutBtn className="final__score-logOut" text="Log Out" />
                        </div>
                    </div>
                    <div className="final__score-lower">
                        <div className="final__score-icon"><i className={scoreImage}></i></div>
                        <div className="final__score-greet">{scoreResult}</div>
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
}

export default Score;
