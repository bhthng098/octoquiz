// IMPORTS ------------------------------------------------------------------------------------------------------------
import React from 'react';
import { Link, Route } from "wouter";
// import QuestionsPage from "./QuestionsPage.tsx";

/**
 * Header for the website
 * @constructor
 */
function QuestionsPageHeader() {
    return (
        <header>
            <div className="primary_header">
                <h1 className="title">OCTOQUIZ</h1>
            </div>
            <nav className="secondary_header" id="menu">
                <div><Link href="/"><a>PLAY</a></Link></div>
                <div><Link href="/create-game"><a>CREATE GAME</a></Link></div>
                <div><Link href="/game-results"><a>GAME RESULTS</a></Link></div>
                <div><Link href="/about"><a>ABOUT US</a></Link></div>
            </nav>
        </header>
    )
}

export default QuestionsPageHeader;