// @ts-ignore
import QuestionsPageGameIDGenerator from "./QuestionsPageGameIDGenerator.tsx";
// @ts-ignore
import QuestionsPageInputs from "./QuestionsPageInputs.tsx";
// @ts-ignore
import QuestionsPageSubmittedAnswers from "./QuestionsPageSubmittedAnswers.tsx";
import React, {Dispatch, SetStateAction, useState} from "react";

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
 * Questions Page Component that represents the entire question input page content
 * @param props game id (string), setter for game id,
 *              number of questions (number), setter for number of questions,
 *              Array<SubmittedQuestion> of all submitted questions and answers,
 *              setter for array of all submitted Q&As
 */
function QuestionsPage(props: {
    gameID: string,
    setGameID: Dispatch<SetStateAction<string>>,
    numQuestions: number,
    setNumQuestions: Dispatch<SetStateAction<number>>,
    allSubmittedQandA: Array<SubmittedQuestion>,
    setAllSubmittedQandA: Dispatch<SetStateAction<Array<SubmittedQuestion>>> }) {

    return (
        <div>
            <QuestionsPageGameIDGenerator gameID={props.gameID} setGameID={props.setGameID}
                                          numQuestions={props.numQuestions} setNumQuestions={props.setNumQuestions}
                                          allSubmittedQandA={props.allSubmittedQandA}
                                          setAllSubmittedQandA={props.setAllSubmittedQandA}/>
            <div className="page_title">Enter Game Questions</div>
            <QuestionsPageInputs gameID={props.gameID}
                                 numQuestions={props.numQuestions} setNumQuestions={props.setNumQuestions}
                                 allSubmittedQandA={props.allSubmittedQandA}
                                 setAllSubmittedQandA={props.setAllSubmittedQandA}
            />

            <QuestionsPageSubmittedAnswers allSubmittedQandA={props.allSubmittedQandA}
                                           setAllSubmittedQandA={props.setAllSubmittedQandA}/>

        </div>
    )
}

export default QuestionsPage;