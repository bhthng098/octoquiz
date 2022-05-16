using UnityEngine;
using System.Threading;
using TMPro;

public class PlayerCollision : MonoBehaviour
{
   public PlayerMovement movement;
   public Score score;
   public GameObject endPanel;
   public TMP_Text scoreMessageDisplay;
   private int ticks;

   void OnCollisionEnter(Collision collision)
    {
        if (collision.gameObject.CompareTag("Obstacle")) {
            ticks = 0;
            score.scoreInt -= 10;
        }
    }

   void OnCollisionStay(Collision collision)
    {
        if (collision.gameObject.CompareTag("Obstacle"))
        {
            scoreMessageDisplay.text = "-10 Points!";
            score.ticks = 0;
            ticks += 1;
            if (ticks == 20) {
                if (score.scoreInt > 0) {
                    score.scoreInt -= 1;
                    ticks = 0;
                } else {
                    score.scoreInt = 0;
                }
            }
        } else {
            scoreMessageDisplay.text = "";
        }
    }

    void OnTriggerEnter(Collider collider)
    {
        if (collider.CompareTag("Question"))
        {
            movement.enabled = false;
        }
    
        if (collider.CompareTag("End"))
        {
            movement.enabled = false;
            score.gameOver = true;
            endPanel.SetActive(true);
        }
    }


}
