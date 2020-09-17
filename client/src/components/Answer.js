import React, { Component } from 'react';

class Answer extends Component {
    state = {
        className : ["", "", "", ""],
        header: ["A", "B", "C", "D"]
    }

    checkAnswer = (e) => {
        let { isAnswered } = this.props;
        
        if(!isAnswered) {
            let answerElement = e.currentTarget;

            const { correctAnswer, increaseScore, showButton } = this.props;
            const answerNumber = answerElement.dataset.id;
            let classNames = this.state.className;
            
            classNames = ["", "", "", ""];
            if(answerNumber === correctAnswer){
                increaseScore();
                classNames[answerNumber - 1] = 'quiz__card-correct';
            }else{
                classNames[answerNumber - 1] = 'quiz__card-wrong';
            }

            this.setState({className : classNames});
            showButton();
        }
    }

    render () {
        const multipleChoice = this.props.multipleChoice && JSON.parse(this.props.multipleChoice);
        let { className, header } = this.state;
        const { isAnswered } = this.props;
        if(!isAnswered){
            className = ["", "", "", ""]
        }

        return (
            <div className="quiz__answer">
                {multipleChoice && multipleChoice.map((element, index) => 
                    (
                        <div className={ `quiz__card ${className[index]}` } onClick={this.checkAnswer} data-id={index + 1} key={index}>
                            <span className="quiz__card-number">{header[index]}</span> <p className="quiz__card-name">{element} </p>
                        </div> 
                    )
                )}
            </div>  
        )
    }
}


export default Answer;
