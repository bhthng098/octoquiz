// IMPORTS ------------------------------------------------------------------------------------------------------------
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, remove} from "firebase/database";
// END IMPORTS --------------------------------------------------------------------------------------------------------

// REACT GENERATED CODE -----------------------------------------------------------------------------------------------
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// END REACT GENERATED CODE -------------------------------------------------------------------------------------------

// FIREBASE INITIALIZATION --------------------------------------------------------------------------------------------
const firebaseConfig = {
    apiKey: "AIzaSyD4EF1KYucqj4BkW5xU8ccERuw1jtS70M8",
    authDomain: "final-test-7e351.firebaseapp.com",
    databaseURL: "https://final-test-7e351-default-rtdb.firebaseio.com",
    projectId: "final-test-7e351",
    storageBucket: "final-test-7e351.appspot.com",
    messagingSenderId: "64862940430",
    appId: "1:64862940430:web:19c38fe934133c72e37b5f"
};
initializeApp(firebaseConfig);
// END FIREBASE INITIALIZATION ----------------------------------------------------------------------------------------

// DATABASE FUNCTIONS -------------------------------------------------------------------------------------------------
/**
 * Function that adds a question to the database.
 * @param gameID [ID of game to add question to]
 * @param questionID [ID of question]
 * @param q [question]
 * @param a1 [first answer]
 * @param a2 [second answer]
 * @param a3 [third answer]
 * @param a4 [fourth answer]
 * @param correct [correct answer]
 */
export function addQuestion(gameID, questionID, q, a1, a2, a3, a4, correct) {
    if (checkQuestionValidity(questionID) && checkAnswerValidity(a1, a2, a3, a4, correct)) {
        const db = getDatabase();
        const questionRef = ref(db, 'games/' + gameID + '/' + questionID);
        set(questionRef, {
            question: q,
            answer1: a1,
            answer2: a2,
            answer3: a3,
            answer4: a4,
            correct: correct
        })
        console.log("valid question, added!");
    }
}

/**
 * Function that checks whether the question ID passed into addQuestion() is valid, must be of form 'question1'.
 * @param questionID [question ID to be checked]
 * @returns {boolean} [flag, true if valid ID, false otherwise]
 */
function checkQuestionValidity(questionID) {
    let flag = false;
    const splitQuestionID = questionID.split("");
    if (splitQuestionID.length === 9 || splitQuestionID.length === 10) {
        if (splitQuestionID[0] === "q" &&
            splitQuestionID[1] === "u" &&
            splitQuestionID[2] === "e" &&
            splitQuestionID[3] === "s" &&
            splitQuestionID[4] === "t" &&
            splitQuestionID[5] === "i" &&
            splitQuestionID[6] === "o" &&
            splitQuestionID[7] === "n") {
            if (splitQuestionID.length === 9) {
                if (!isNaN(splitQuestionID[8])) {
                    flag = true
                }
            } else if (splitQuestionID.length === 10) {
                if (!isNaN(splitQuestionID[8] + splitQuestionID[9])) {
                    if (splitQuestionID[8] !== "-") {
                        flag = true
                    }
                }
            }
        }
    }
    if (!flag) {
        console.log("ERROR: invalid question ID, must be of form 'question1'");
    }
    return flag;
}

/**
 * Function that checks whether the answer choices passed into addQuestion() are valid, checks for repeated answers
 * and ensures that the correct answer matches one of the choices.
 * @param a1 [first answer]
 * @param a2 [second answer]
 * @param a3 [third answer]
 * @param a4 [fourth answer]
 * @param correct [correct answer]
 * @returns {boolean} [flag, true if valid answers, false otherwise]
 */
function checkAnswerValidity(a1, a2, a3, a4, correct) {
    let flag = false;
    let answers = [];
    answers.push(a1, a2, a3, a4);
    if (new Set(answers).size === answers.length) {
        if (correct === a1 || correct === a2 || correct === a3 || correct === a4) {
            flag = true;
        }
    }
    if (!flag) {
        console.log("ERROR: invalid answers, check for repeated answers or invalid correct answer")
    }
    return flag;
}

/**
 * Function that returns all information for given question (e.g. question, answers, correct answer).
 * @param gameID [ID of game where question is located]
 * @param questionID [question ID]
 * @returns {null} [hashmap of question info]
 */
export function getQuestionInfo(gameID, questionID) {
    const db = getDatabase();
    let data = null;
    if (checkQuestionValidity(questionID)) {
        const questionRef = ref(db, 'games/' + gameID + '/' + questionID);
        onValue(questionRef, (snapshot) => {
            if (snapshot.exists()) {
                data = snapshot.val();
                console.log(data);
            } else {
                console.log("ERROR: requested data does not exist")
            }
        })
    }
    return data;
}

/**
 * Function that returns all the questions for a given game.
 * @param gameID [game ID of requested questions]
 * @returns {*[]} [array of questions]
 */
export function getAllQuestions(gameID) {
    const db = getDatabase();
    let data = null;
    let questions = [];
    const gameRef = ref(db, 'games/' + gameID);
    onValue(gameRef, (snapshot) => {
        if (snapshot.exists()) {
            data = snapshot.val();

            for (let i = 0; i < Object.keys(data).length; i++) {
                let currentQuestion = Object.keys(data)[i]
                questions.push(data[currentQuestion]["question"]);
            }

            // previous for loop: did not work because not all question ids will be sequential
            // (since user can delete questions)

            // for (let i = 0; i < Object.keys(data).length - 1; i++) {
            //     let currentQuestion = "question" + (i+1)
            //     questions.push(data[currentQuestion]["question"])
            // }
        } else {
            console.log("ERROR: requested data does not exist for " + gameID)
        }
    })
    return questions;
}

/**
 * Function that returns the correct answer for a given question ID.
 * @param gameID [game ID where question is located]
 * @param questionID [question ID]
 * @returns {null} [string of correct answer]
 */
function getCorrectAnswer(gameID, questionID) {
    const db = getDatabase();
    let data = null;
    let correct = null;
    if (checkQuestionValidity(questionID)) {
        const questionRef = ref(db, 'games/' + gameID + '/' + questionID);
        onValue(questionRef, (snapshot) => {
            if (snapshot.exists()) {
                data = snapshot.val();
                correct = data["correct"];
            } else {
                console.log("ERROR: requested data does not exist")
            }
        })
    }
    return correct;
}

/**
 * Function that returns the text of a question given a question ID.
 * @param gameID [game ID where question is located]
 * @param questionID [question ID]
 * @returns {null} [string of question]
 */
function getQuestion(gameID, questionID) {
    const db = getDatabase();
    let data = null;
    let question = null;
    if (checkQuestionValidity(questionID)) {
        const questionRef = ref(db, 'games/' + gameID + '/' + questionID);
        onValue(questionRef, (snapshot) => {
            if (snapshot.exists()) {
                data = snapshot.val();
                question = data["question"];
            } else {
                console.log("ERROR: requested data does not exist")
            }
        })
    }
    return question;
}

/**
 * Function that returns the four answers for a given question.
 * @param gameID [game ID where question is located]
 * @param questionID [question ID]
 * @returns {*[]} [array of answers]
 */
function getAnswers(gameID, questionID) {
    const db = getDatabase();
    let data = null;
    let answers = [];
    if (checkQuestionValidity(questionID)) {
        const questionRef = ref(db, 'games/' + gameID + '/' + questionID);
        onValue(questionRef, (snapshot) => {
            if (snapshot.exists()) {
                data = snapshot.val();
                answers.push(data["answer1"])
                answers.push(data["answer2"])
                answers.push(data["answer3"])
                answers.push(data["answer4"])
            } else {
                console.log("ERROR: requested data does not exist")
            }
        })
    }
    return answers;
}

/**
 * Function that removes a question from a given game.
 * @param gameID [game ID where question is located]
 * @param questionID [ID of question to be removed]
 */
// eslint-disable-next-line
export function removeQuestion(gameID, questionID) {
    if (checkQuestionValidity(questionID)) {
        const db = getDatabase();
        const questionRef = ref(db, 'games/' + gameID + '/' + questionID);
        remove(questionRef)
    }
}

/**
 * Function that removes a game and its from the database.
 * @param gameID [ID of game to be removed]
 */
// eslint-disable-next-line
export function removeGame(gameID) {
    const db = getDatabase();
    const gameRef = ref(db, 'games/' + gameID);
    remove(gameRef)
}
// END DATABASE FUNCTIONS ---------------------------------------------------------------------------------------------

// CREATE HTML PAGE + TEST DATABASE FUNCTIONS -------------------------------------------------------------------------
/**
 * Function that sets up the html page for viewing questions.  This code demonstrates how questions can be added
 * and retrieved from the database.
 * @returns {JSX.Element} [html code]
 * @constructor
 */
export function CreatePage() {
    addQuestion("math quiz", "question1", "What is 2+2?", "3", "4", "5","6", "4");
    addQuestion("math quiz", "question2", "What is 4*5?", "20", "15", "16","21", "20");
    let question1 = getQuestionInfo("math quiz", "question1");
    let question2 = getQuestionInfo("math quiz", "question2");
    return(
        <div>
            <h1>Questions</h1>
            <h2>Question 1</h2>
            <p>{question1["question"]}</p>
            <p>{question1["answer1"]}</p>
            <p>{question1["answer2"]}</p>
            <p>{question1["answer3"]}</p>
            <p>{question1["answer4"]}</p>
            <h2>Question 2</h2>
            <p>{question2["question"]}</p>
            <p>{question2["answer1"]}</p>
            <p>{question2["answer2"]}</p>
            <p>{question2["answer3"]}</p>
            <p>{question2["answer4"]}</p>
        </div>
    )
}

/**
 * Tests all the database operations above.  Outputs are in the web console and can be checked.
 * @constructor
 */
export function TestFunctions() {
    console.log("all question data for given question:")
    console.log(getQuestionInfo("math quiz", "question1"));
    console.log("all questions for given game:")
    console.log(getAllQuestions("math quiz"));
    console.log("correct answer for given question:")
    console.log(getCorrectAnswer("math quiz", "question1"));
    console.log("question text for given question:")
    console.log(getQuestion("math quiz", "question1"));
    console.log("all answers for given question:")
    console.log(getAnswers("math quiz", "question1"));
    console.log("checks if given question ID is valid:")
    console.log(checkQuestionValidity("question1"));
    console.log("checks if given answers are valid:")
    console.log(checkAnswerValidity("1","2","3","4", "4"));
    // removeQuestion("math quiz", "question2")
    // removeGame("math quiz")
}
// END CREATE HTML PAGE + TEST DATABASE FUNCTIONS ---------------------------------------------------------------------
