import React, { Component } from 'react';
import LogOutBtn from './LogOutBtn';

class Score extends Component {
    render() {
        console.log(this.props.location.aboutProps);
        return (
            <div className="final-wrapper">
                <div className="final__score">
                    <div className="final__score-upper">
                        <h1 className="final__score-text">Your Score</h1>
                        <h2 className="final__score-count">0</h2>
                        <div className="final__score-btn">
                            <button  className="final__score-playAgain">PLAY AGAIN</button>
                            <LogOutBtn  className="final__score-logOut" text="Log Out" />
                        </div>
                    </div>
                    <div className="final__score-lower">
                        <div className="final__score-icon"><i className='fas fa-thumbs-up'></i></div>
                        <div className="final__score-greet">Great job</div>
                    </div>
                </div>
                <form className="comment__form">
                    <div className="comment__form-label">ANY COMMENT ABOUT QUIZ</div><br/> 
                    <textarea className="comment__form-comment" type="text" name="comment" placeholder="Enter COMMENT" /><br/>
                    <button className="comment__form-btn" type="submit">COMMENT</button>
                </form>
            </div>
        )
    }
}

export default Score;
