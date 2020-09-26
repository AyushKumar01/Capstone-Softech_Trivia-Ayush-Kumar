import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Logo from '../assets/images/hourglass.jpg';
import axios from 'axios';
import Answer from './Answer';
import * as Constant from './Constants';

const timerTimeInSeconds = 15;
export default class Quiz extends Component {
    state = {
        questions: [],
        selectedQuestion: {},
        number: 0,
        score: 0,
        showButton: false,
        questionAnswered: false,
        time: {}, seconds: timerTimeInSeconds
    }

    timer = 0;
  
    async componentDidMount() {
        try {
            const { data } = await this.getQuestionsById();
            Constant.verifyResponse(data.error);
            this.setState({
                questions: data.questions
            }); 
            this.pushData(this.state.number);
            this.startTimer();
        } catch (error) {
            console.log(error);
        }
    }

    componentWillUnmount(){
        clearInterval(this.timer);
        this.resetTimer();
    }
    
    getQuestionsById = () => {
        let id = this.props.match.params.id;
        return axios
        .get(`${Constant.API_URL}/api/category/${id}`, {
            headers: {
              authorization: `BEARER ${Constant.getToken()}`
            }})   
    }

    nextQuestionHandler = () => {
        this.setAnswerState();
        this.resetTimer();
    }

    handleShowButton = () => {
        this.setState({
            showButton: true,
            questionAnswered: true
        })
    }

    pushData = (number) => {
        this.setState({
            selectedQuestion: this.state.questions[number],
            number: this.state.number + 1
        });
    }

    increaseScore = () => {
        this.setState({score: this.state.score + 1});
    }

    secondsToTime = (secs) => {
        let hours = Math.floor(secs / (60 * 60));
    
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
    
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
    
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        let obj = {
          "h": hours,
          "m": minutes,
          "s": seconds
        };
        return obj;
      }

    startTimer = () => {
        if (this.timer === 0 && this.state.seconds > 0) {
          this.timer = setInterval(this.countDown, 1000);
        }
    }
    
    submit = () => {
        clearInterval(this.timer);
        this.resetTimer();
    }

    countDown = () => {
        // Remove one second, set state so a re-render happens.
        if(window.location.href.includes("category")){
            let seconds = this.state.seconds - 1;
            this.setState({
                time: this.secondsToTime(seconds),
                seconds: seconds,
            });
            
            // Check if we're at zero.
            if (seconds === 0) { 
                clearInterval(this.timer);
    
                if(this.state.number === this.state.questions.length){
                this.setState({showButton : true});
                this.resetTimer();
                }else{              
                this.setAnswerState();
                this.resetTimer(); 
                this.startTimer(); 
                }
            }
        }
    }

    setAnswerState() {
        let { number } = this.state;

        this.pushData(number);
        this.setState({
            showButton: false,
            questionAnswered: false
        });
    }

    resetTimer() {
        this.setState({ seconds: timerTimeInSeconds });
        this.timer = 0;
        // this.startTimer();
    }

    render() {
        if(this.state.selectedQuestion){
            const { questionName, multipleChoice, answer } = this.state.selectedQuestion;
            const { showButton, questionAnswered, score, questions, number } = this.state;
    
            let showSubmit = false;
            if(questions && number === questions.length){
                showSubmit = true;
            }
            return (
                <div className="quiz">
                    <div className="quiz__timer">
            <div className="quiz__timer-text"><span>Count Down</span>&nbsp;<span>{this.state.time.m}:{this.state.time.s}</span></div>
                        <div><img className="quiz__timer-image" src={Logo} alt="Logo" /></div>
                    </div>
                    <div className="quiz__wrapper">
                        <div className="quiz__card-head">
                            <h3>Question {number}/{questions && questions.length}</h3>
                            <h3 className="quiz__card-heading"> {questionName}</h3>
                        </div>
                        <Answer multipleChoice={multipleChoice} correctAnswer={answer} increaseScore={this.increaseScore} 
                                showButton={this.handleShowButton} isAnswered={questionAnswered}/>   
                        {showSubmit && showButton === true ? (
                            <Link to={{pathname:'/score', aboutProps:{score: score, totalQuestion: questions.length}}} className="quiz__btn-link quiz__btn" >
                                <button className="quiz__submit-btn" onClick={this.submit}>SUBMIT</button></Link>
                        ) :
                        (showButton ? <button className="quiz__btn" onClick={this.nextQuestionHandler}>NEXT QUESTION</button> : "")
                        }
                    </div>
                </div>
            )
        }else{
            return (
                <div className="quiz">
                    No question in this category
                </div>
            )
        }
    }
};
