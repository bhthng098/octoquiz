import './styles/App.css';
import './styles/index.css';
import './styles/createGame.css'
import './styles/game-results-page.css';
import QuestionsPageHeader from "./QuestionsPageHeader.tsx";
import QuestionsPage from "./QuestionsPage.tsx";
import About from "./About.tsx";
import GameResultsPageInput from "./GameResultsPageInput.tsx";
import GameResultsPageLeaderboard from "./GameResultsPageLeaderboard.tsx";
import GameResultsPageQuestionDisplay from "./GameResultsPageQuestionDisplay.tsx";
import {TestGameExists} from "./QuestionsPageTests.tsx";
import {TestFunctions} from "./index.js";

import {useState} from "react";
import React from "react";

import { Route } from "wouter";




function App() {
    const originalArray = [];
    const [gameID, setGameID] = useState("");
    const [numQuestions, setNumQuestions] = useState(1);
    const [allSubmittedQandA, setAllSubmittedQandA] = useState(originalArray);
    const studentList = [];
    const [UserInputID, setUserInputID] = useState("")

    return (

        <div>
            <QuestionsPageHeader/>

            {/*Routes to activate the links in the header to different pages*/}
            {/*You can place your page's components inside its Route tag*/}

            {/*Site designed to open the Game page by default*/}
            <Route path="/">
                <iframe id="game" src="https://i.simmer.io/@SimingRox/octoquiz" />
            </Route>

            {/*Create Game (Questions) page*/}
            <Route path="/create-game">
                <QuestionsPage gameID={gameID} setGameID={setGameID}
                               numQuestions={numQuestions} setNumQuestions={setNumQuestions}
                               allSubmittedQandA={allSubmittedQandA}
                               setAllSubmittedQandA={setAllSubmittedQandA}/>
            </Route>

            {/*Game Results page*/}
            <Route path="/game-results">
                {/*results page components here*/}
                <GameResultsPageInput UserInputID={UserInputID} setUserInputID={setUserInputID}/>
                <GameResultsPageLeaderboard UserInputID={UserInputID}/>

                <GameResultsPageQuestionDisplay UserInputID={UserInputID}/>
            </Route>

            {/*About page*/}
            <Route path="/about">
                <About/>
            </Route>

            {/*tests*/}
            <TestGameExists/>
            {/*<TestFunctions/>*/}
        </div>
    );
}



export default App;
