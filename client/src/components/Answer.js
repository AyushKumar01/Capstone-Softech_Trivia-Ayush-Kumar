import React from 'react'

function Answer(props) {
    const multipleChoice = props.multipleChoice && JSON.parse(props.multipleChoice);
    if(multipleChoice && multipleChoice.length > 0){
        return (
            <div className="quiz__answer">
                <div className="quiz__card"><span className="quiz__card-number">A</span> <p className="quiz__card-name">{multipleChoice[0]} </p></div>
                <div className="quiz__card"><span className="quiz__card-number">B</span> <p className="quiz__card-name">{multipleChoice[1]} </p></div>
                <div className="quiz__card"><span className="quiz__card-number">C</span> <p className="quiz__card-name">{multipleChoice[2]} </p></div>
                <div className="quiz__card"><span className="quiz__card-number">D</span> <p className="quiz__card-name">{multipleChoice[3]} </p></div>
            </div>
        )
    }else{
        return (<></>)
    }
}

export default Answer;
