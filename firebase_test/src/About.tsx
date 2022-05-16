import React from 'react';
import "./styles/about.css";

function About() {
    return (
        <div>
            <div id="thanks">Thanks for playing!</div>
            <div id="credits">
                This game was made by
                <div id="names">
                    <div id="siming">Siming Feng</div>
                    <div id="zehua">Ze Hua Chen</div>
                    <div id="beatrice">Beatrice Hoang</div>
                    <div id="anthony">Anthony Ragucci</div>
                    <div id="dan">Dan Wexler</div>
                </div>
                For <a href="https://cs.brown.edu/courses/cs0320/" target="_blank">CSCI 0320</a> at Brown University.
            </div>
        </div>
    );
}

export default About;