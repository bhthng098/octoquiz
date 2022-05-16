using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class Score : MonoBehaviour
{
    public Transform player;
    public TextMeshProUGUI score;
    public int scoreInt;
    public int ticks;
    public bool gameOver;
    public TMP_Text endScoreDisplay;

    void Start()
    {
        gameOver = false;
        scoreInt = 0;
        ticks = 0;
    }

    public void resetScore() {
        scoreInt = 0;
        ticks = 0;
    }

    // Update is called once per frame
    void FixedUpdate()
    {
        if (!gameOver) {
            ticks += 1;
            if (ticks == 10) {
                scoreInt += 1;
                ticks = 0;
            }
            score.text = scoreInt.ToString("0");
        } else {
            endScoreDisplay.text = "Score: " + scoreInt;
        }
    }
}
