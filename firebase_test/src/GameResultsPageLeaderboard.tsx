import React, {Dispatch, SetStateAction} from 'react'
import {getAllQuestions} from './index.js';

function GameResultsPageLeaderboard(props: {UserInputID : string}) {

    let styleObj1 = {height: 250};
    let styleObj2 = {height: 180};
    let styleObj3 = {height: 90};
    let validCode = false;
    let dataset = getAllQuestions(props.UserInputID);

    if  (dataset != null && dataset.length >= 3) {
        validCode = true;
        //then some work to get students listed
    } else if (props.UserInputID == "demonstrate") {
        validCode = true;
    }


    if (validCode) {
        return (
            <div>
                <div className="page_title">Results</div>

                <table className="graph">
                    <caption>Top Scorers</caption>
                    <thead>
                    <tr>
                        <th scope="col">Item</th>
                        <th scope="col">Percent</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr style={styleObj3} className="thirdplace" id="thirdPlace">
                        <th scope="row" id="thirdPlaceName">Third place</th>
                        <th scope="row" id="thirdPlaceScore" className="score">10000 pts</th>
                        <td><span></span></td>
                    </tr>
                    <tr style={styleObj1} id="firstPlace">
                        <th scope="row" id="firstPlaceName">First place</th>
                        <th scope="row" id="firstPlaceScore" className="score">15000 pts</th>
                        <td><span></span></td>
                    </tr>
                    <tr style={styleObj2} id="secondPlace">
                        <th scope="row" id="secondPlaceName">Second place</th>
                        <th scope="row" id="secondPlaceScore" className="score">12000 pts</th>
                        <td><span></span></td>
                    </tr>
                    </tbody>
                </table>

                <p> <br></br> <br></br> <br></br> <br></br>Class Performance</p>

            </div>
        )
    }
}


export default GameResultsPageLeaderboard;