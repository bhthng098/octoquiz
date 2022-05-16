# Unity Game

## Dependencies

Unity 2021.3.1f1

C# for our programming language

Plastic SCM for version control

Simmer.io for free WebGL game hosting

## Grading

Github did not allow us to upload our entire Unity project onto the platform because our project contained too many files. As a result, you will not be able to directly view our project via the Unity Editor. However, we have included our scripts folder from our project (which contains all of our code), so that you can grade our code.

Generally, for any public variables at the top of our scripts, we have linked them to the relevant objects in the game scene via the Unity Editor, so that our scripts can communicate with the game objects. For instance, in our Score.cs script, line 12 says "public TMP_Text endScoreDisplay;". This allows us to connect a text field object in the game scene to this script, so that we could later use "endScoreDisplay.text" to manipulate what is shown in the text field.

#### Profesionalism / Division of Labor

Since Github did not support version control for Unity projects, we instead used a service called Plastic SCM. We have included screenshots which show our commit messages so that you can see our division of labor.

## Testing

Unfortunately, we could not figure out a way to automate testing for our game (something akin to Selenium). As such, we mainly resorted to manually testing various aspects of the game.

Here is a list of common issues which we would test for upon major changes to the game:

- Game does not start if you don't load in a game code.

- Game does not start if you load in an empty / nonexistent game code.

- Start page displays 'Loading...' if you load a valid game code, but click start before the questions are loaded.

- Bumping into obstacles and walls decrease your points by 10 and displays a message near the top of the screen

- The pressed-down graphic for the answer buttons reset for each new problem

- If you don't select any answer, the game displays a message saying you didn't choose anything, and doesn't award you points

- If you get the correct answer for one problem, and the next problem's correct answer is in the same position, but you don't choose an answer, you are not awarded points

- If you somehow manage to fall off the map, the game restarts

#### Current Known Bugs

- Sometimes (very rarely), Unity's collision detection faults - it detects when you enter the collision, but not when you exit the collision. This can lead to unexpected bugs (entering a collision sets a variable to true, exiting sets it back to false, but if you never exit the variable will stay true).

- When hitting a question capsule, the game engine is supposed to stop your movement. However, there can be a slight lag during this process, causing you to end up at a position farther down the map compared to where you started upon completing a question.

## Future Improvement

In our limited time frame, we were only able to complete a number of desired functionality. For the future, we could see this project improving in the following ways:

- The UI and map design could be improved to be more aesthetically pleasing and match with the design of the other front end pages.

- The game map is currently static. As such, players will likely get bored playing the same map over and over again. For the future, we could research how to procedurally generate obstacles in the map.

- Currently, we have a fixed number of question capsules in the map. For each capsule, we randomly choose a question from all of the available questions. This poses two problems. First, if there are very few questions, there is a high chance that you will encounter repeated questions. Second, if there are very many questions, you will probably not encounter all of the questions. To solve both problems, we could make the map length variable instead of fixed, and have each question appear only once. So, the map would be shorter for a game with less questions, and longer for a game with more questions, etc.

- Additionally, we could track the stats of the player with respect to different questions, and give the player questions that they have had lower success rates with, so as to challenge them more.