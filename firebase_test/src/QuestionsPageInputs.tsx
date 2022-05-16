// @ts-ignore
import React, {Dispatch, SetStateAction, useState} from 'react';
import {addQuestion, getQuestionInfo} from './index.js'

type SubmittedQuestion = {
    gameId: string,
    questionId: string,
    question: string,
    correctAnswer: string,
    incorrectAnswer1: string;
    incorrectAnswer2: string;
    incorrectAnswer3: string;
}

/**
 * Questions Page Component that represents the input boxes and submit button
 * @param props game id, number of questions, setter for number of questions,
 *              an array of all the submitted questions and answers (type SubmittedQuestion),
 *              setter for array of all submitted Qs and As
 */
function QuestionsPageInputs(props: {
    gameID: string,
    numQuestions: number,
    setNumQuestions: Dispatch<SetStateAction<number>>,
    allSubmittedQandA: Array<SubmittedQuestion>,
    setAllSubmittedQandA: Dispatch<SetStateAction<Array<SubmittedQuestion>>> }) {

    const [newQuestionInput, setNewQuestionInput] = useState<string>("");
    const [newCorrectAnswer, setNewCorrectAnswer] = useState<string>("");
    const [newIncorrectAnswer1, setNewIncorrectAnswer1] = useState<string>("");
    const [newIncorrectAnswer2, setNewIncorrectAnswer2] = useState<string>("");
    const [newIncorrectAnswer3, setNewIncorrectAnswer3] = useState<string>("");

    return (
        <div>

            <form id="inputs_holder">
                <div id="question_box">
                    <label >New Question:</label><br/>
                    {/* Question input box that changes the new question value when someone types in it*/}
                    <textarea id="question_text" onChange={event => {
                        setNewQuestionInput(event.target.value)}}></textarea>
                </div>

                <div id="answer_inputs_holder">
                    <div id="answers_boxes_label">Answers:</div>
                    <div className="answer_box">
                        <label htmlFor="A" id="correct_answer_input">Correct answer:</label>
                        {/* Correct answer input box that changes the new correct answer value when it is types in*/}
                        <input className="answer_input" type="text" name="A" id="A"
                               onChange={event => {setNewCorrectAnswer(event.target.value)}}
                        />
                    </div>
                    <div className="answer_box">
                        <label htmlFor="B">Other answer:</label>
                        {/* Incorrect answer input box that changes the new correct answer value when it is types in*/}
                        <input className="answer_input" type="text" name="B" id="B"
                               onChange={event => {setNewIncorrectAnswer1(event.target.value)}}
                        />
                    </div>
                    <div className="answer_box">
                        <label htmlFor="C">Other answer:</label>
                        {/* Incorrect answer input box that changes the new correct answer value when it is types in*/}
                        <input className="answer_input" type="text" name="C" id="C"
                               onChange={event => {setNewIncorrectAnswer2(event.target.value)}}
                        />
                    </div>
                    <div className="answer_box">
                        <label htmlFor="D">Other answer:</label>
                        {/* Incorrect answer input box that changes the new correct answer value when it is types in*/}
                        <input className="answer_input" type="text" name="D" id="D"
                               onChange={event => {setNewIncorrectAnswer3(event.target.value)}}
                        />
                    </div>
                </div>
            </form>

            <div id="submit_button">
                <button type="submit" onClick={() => {
                    // set new submitted question
                    let newSubmittedQandA : SubmittedQuestion = {
                        gameId: props.gameID,
                        questionId: "question" + props.numQuestions.toString(),
                        question: newQuestionInput,
                        correctAnswer: newCorrectAnswer,
                        incorrectAnswer1: newIncorrectAnswer1,
                        incorrectAnswer2: newIncorrectAnswer2,
                        incorrectAnswer3: newIncorrectAnswer3,
                    }
                    // add the new question to the questions list
                    props.setAllSubmittedQandA([...props.allSubmittedQandA, newSubmittedQandA])
                    // change the questionId
                    props.setNumQuestions(props.numQuestions + 1);

                    clearInputs();
                    SendQuestionToDatabase(newSubmittedQandA);

                }}>Add Question</button>
            </div>
        </div>
    )
}

/**
 * stores the given question into the firebase database
 * @param newQandA
 * @constructor
 */
function SendQuestionToDatabase(newQandA : SubmittedQuestion) {
    addQuestion(newQandA.gameId,
        newQandA.questionId,
        newQandA.question,
        newQandA.correctAnswer,
        newQandA.incorrectAnswer1,
        newQandA.incorrectAnswer2,
        newQandA.incorrectAnswer3,
        newQandA.correctAnswer);

    getQuestionInfo(newQandA.gameId, newQandA.questionId);
}

/**
 * Clears text inside the question and answer boxes
 */
function clearInputs() {
    document.getElementById("inputs_holder").reset();
}

export default QuestionsPageInputs;