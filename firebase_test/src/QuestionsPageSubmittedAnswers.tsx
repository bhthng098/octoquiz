import React, {Dispatch, SetStateAction} from 'react'
import {removeQuestion as removeQuestionFromDb, getQuestionInfo} from "./index.js"

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
 * Questions Page Component for the section that displays the submitted
 * answers and questions.
 * @param props an array of all the submitted Questions and answers,
 *              setter for the array of all the submitted Qs and As
 */
function QuestionsPageSubmittedAnswers(props: {allSubmittedQandA: Array<SubmittedQuestion>,
    setAllSubmittedQandA: Dispatch<SetStateAction<Array<SubmittedQuestion>>>}) {

    return (
        <div id="added_questions">
            {props.allSubmittedQandA?.map(item => // for each submitted q&a
                <div key={item.id}>
                    <div className="added_question_and_answers" id={"q" + item.questionId}>
                        {/*QUESTION DISPLAY*/}
                        <div className="added_q">
                            <u>Question:</u> <br/>
                            {item.question}
                        </div>
                        {/*ANSWERS DISPLAY*/}
                        <div className="added_answers">
                            <u>Answers:</u>
                            <div className="correct_added_answer"> {item.correctAnswer} </div>
                            <div> {item.incorrectAnswer1} </div>
                            <div> {item.incorrectAnswer2} </div>
                            <div> {item.incorrectAnswer3} </div>
                        </div>
                        {/*DELETE AND EDIT BUTTONS FOR EACH QUESTION*/}
                        <div className="added_q_buttons">
                            {/*Delete button removes question from the array of Q&As
                             and removes question from database*/}
                            <button className="delete_button" id={"delete_button" + item.questionId}
                                    onClick={() => RemoveQuestionFromFrontend(props.allSubmittedQandA,
                                        props.setAllSubmittedQandA, item.questionId)}>Delete</button>
                            {/*Edit button removes question from the array of Q&As,
                             removes question from database, and updates the input boxes
                             with the question/answer values of that question*/}
                            <button className="edit_button" id={"edit_button" + item.questionId}
                                    onClick={() => EditQuestion(props.allSubmittedQandA,
                                        props.setAllSubmittedQandA, item.questionId)}>Edit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

/**
 * removes a question (with the given ID number) from the submitted questions section
 * @param allSubmittedQandA
 * @param setAllSubmittedQandA
 * @param questionId
 */
function RemoveQuestionFromFrontend(allSubmittedQandA: Array<SubmittedQuestion>,
                        setAllSubmittedQandA: Dispatch<SetStateAction<Array<SubmittedQuestion>>>,
                        questionId: string) {
    const questionToRemove : SubmittedQuestion = allSubmittedQandA.find(item => item.questionId === questionId);
    getQuestionInfo(questionToRemove.gameId, questionToRemove.questionId);
    removeQuestionFromDb(questionToRemove.gameId, questionToRemove.questionId);
    getQuestionInfo(questionToRemove.gameId, questionToRemove.questionId);
    let newSubmittedQandA = allSubmittedQandA.filter(item => item.questionId !== questionId);
    setAllSubmittedQandA(newSubmittedQandA);
}

/**
 * removes a question (with the given ID number) from the submitted questions section
 * and puts all question/answer queries into the input boxes
 * @param allSubmittedQandA
 * @param setAllSubmittedQandA
 * @param questionId
 */
function EditQuestion(allSubmittedQandA: Array<SubmittedQuestion>,
                      setAllSubmittedQandA: Dispatch<SetStateAction<Array<SubmittedQuestion>>>,
                      questionId: string) {
    const questionToEdit : SubmittedQuestion = allSubmittedQandA.find(item => item.questionId === questionId);
    const questionBox = document.getElementById("question_text") as HTMLTextAreaElement;
    questionBox.value = questionToEdit.question;
    const answerInputs = document.getElementsByClassName("answer_input") as
        HTMLCollectionOf<HTMLInputElement>;
    answerInputs.item(0).value = questionToEdit.correctAnswer;
    answerInputs.item(1).value = questionToEdit.incorrectAnswer1;
    answerInputs.item(2).value = questionToEdit.incorrectAnswer2;
    answerInputs.item(3).value = questionToEdit.incorrectAnswer3;

    RemoveQuestionFromFrontend(allSubmittedQandA, setAllSubmittedQandA, questionId);
}

export default QuestionsPageSubmittedAnswers;