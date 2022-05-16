import React, {Dispatch, SetStateAction} from 'react'
import {getAllQuestions, getQuestionInfo} from './index.js';

function GameResultsPageQuestionDisplay(props: {UserInputID : string}) {

    let styleObj1 = {height: 250};
    let styleObj2 = {height: 180};
    let styleObj3 = {height: 90};
    let validCode2 = false;
    let dataset = getAllQuestions(props.UserInputID);
    let questions: JSX.Element[] = []
    let questions2: JSX.Element[] = [<p>hello</p>, <p>friendo</p>]

    if  (dataset != null && dataset.length >= 1) {
        validCode2 = true;
    } else if (props.UserInputID == "demonstrate") {
        validCode2 = true;
    }

    for (const question of dataset) {
        let newquest = <div className="question_container">
            <div className="question_item">{question}</div>
            <div className="item"> Correct rate</div>
            <div className="item"> Skip rate</div>
            <div className="item"> most common second answer</div>
        </div>
        questions = questions.concat(newquest);
    }


    if (validCode2) {
        return (
            <div className="questions" id="questionDisplay">
                <br></br>
                <br></br>
                <br></br>

                {questions}

            </div>)


    }
}


export default GameResultsPageQuestionDisplay;