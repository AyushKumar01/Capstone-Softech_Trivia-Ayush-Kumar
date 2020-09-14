import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Logo from '../assets/images/hourglass.jpg';
import axios from 'axios';
import Answer from './Answer';
import * as Constant from './Constants';

export default class Quiz extends Component {
    state = {
        questions: [],
        selectedQuestion: {},
        number: 0,
        score: 0,
        showButton: false,
        questionAnswered: false
    }
  
    async componentDidMount() {
        try {
            const { data } = await this.getQuestionsById();
            this.setState({
                questions: data.questions
            }); 
            this.pushData(this.state.number);
        } catch (error) {
        console.log(error);
        }
    }
    
    getQuestionsById = () => {
        let id = this.props.match.params.id;
        return axios
        .get(`${Constant.API_URL}/category/${id}`, {
            headers: {
              authorization: `${Constant.token}`
            }})   
    }

    nextQuestionHandler = () => {
        let { number } = this.state;

            this.pushData(number);
            this.setState({
                showButton: false,
                questionAnswered: false
            });
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

    // nextQuestionHandler = () => {
    //     this.pushData(this.state.number);
    // }

    increaseScore = () => {
        this.setState({score: this.state.score + 1});
    }

    render() {
        const { questionName, multipleChoice, answer } = this.state.selectedQuestion;
        const { showButton, questionAnswered, score } = this.state;

        let showSubmit = false;
        if(this.state.number === this.state.questions.length){
            showSubmit = true;
        }
        return (
            <div className="quiz">
                <div className="quiz__timer">
                    <div className="quiz__timer-text"><span>Count Down</span>&nbsp;<span>00</span></div>
                    <div><img className="quiz__timer-image" src={Logo} alt="Logo" /></div>
                </div>
                <div className="quiz__wrapper">
                    <div className="quiz__card-head">
                        <h3>Question {this.state.number}/{this.state.questions.length}</h3>
                        <h3 className="quiz__card-heading"> {questionName}</h3>
                    </div>
                    <Answer multipleChoice={multipleChoice} correctAnswer={answer} increaseScore={this.increaseScore} 
                            showButton={this.handleShowButton} isAnswered={questionAnswered}/>   
                    {showSubmit && showButton === true ? (
                        <Link to={{pathname:'/score', aboutProps:{score: score}}} ><button className="quiz__btn" onClick={this.submit}>SUBMIT</button></Link>
                    ) :
                    (showButton ? <button className="quiz__btn" onClick={this.nextQuestionHandler}>NEXT QUESTION</button> : "")
                    }
                </div>
            </div>
        )
    }
};
