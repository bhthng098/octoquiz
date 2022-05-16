import React, {Dispatch, SetStateAction} from 'react'
import {removeGame} from "./index.js"

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
 * Questions Page Component that generates a random game ID.
 * When user clicks on "Generate Another Random Game ID", it clears all values
 * for a new game.
 * Clicking the button DOES NOT create a new game in firebase.
 * @param props
 */
function QuestionsPageGameIDGenerator(props: {gameID : string,
                                              setGameID: Dispatch<SetStateAction<string>>,
                                              numQuestions: number,
                                              setNumQuestions: Dispatch<SetStateAction<number>>,
                                              allSubmittedQandA: Array<SubmittedQuestion>,
                                              setAllSubmittedQandA: Dispatch<SetStateAction<Array<SubmittedQuestion>>>
}) {


    if (props.gameID === "") {
        const randInt: number = Math.floor(Math.random() * 1000000);
        props.setGameID(randInt.toString());
    }

    return (
        <div>
            <h2>Gamecode: {props.gameID}</h2>
            <button id="generate_random_id_button" onClick={() => {
                const randInt: number = Math.floor(Math.random() * 1000000);
                // reassign game ID number
                props.setGameID(randInt.toString());
                // empty all submitted Q&As
                props.setAllSubmittedQandA([]);
                // reset number of Qs to 0
                props.setNumQuestions(0);
            }}>Generate Another Random Game ID</button>
        </div>
    )
}

export default QuestionsPageGameIDGenerator;