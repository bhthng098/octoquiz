using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;
using TMPro;

public class HandleQuestion : MonoBehaviour
{
    public PlayerMovement movement;
    public GameObject qpanel;
    public Score score;
    public GameObject CodeController;
    public Firebase firebase;
    public TextMeshProUGUI qtitle;
    public TextMeshProUGUI ans1;
    public TextMeshProUGUI ans2;
    public TextMeshProUGUI ans3;
    public TextMeshProUGUI ans4;
    public GameObject A;
    public GameObject B;
    public GameObject C;
    public GameObject D;
    static Question curr_question;
    static string curr_ans;
    private int curr_score;
    
    void OnTriggerEnter(Collider capsule)
    {
        if (capsule.CompareTag("Player"))
        {
            A = GameObject.Find("EventSystem");
            B = GameObject.Find("EventSystem");
            C = GameObject.Find("EventSystem");
            D = GameObject.Find("EventSystem");
            A.GetComponent<UnityEngine.EventSystems.EventSystem>().SetSelectedGameObject(null);
            B.GetComponent<UnityEngine.EventSystems.EventSystem>().SetSelectedGameObject(null);
            C.GetComponent<UnityEngine.EventSystems.EventSystem>().SetSelectedGameObject(null);
            D.GetComponent<UnityEngine.EventSystems.EventSystem>().SetSelectedGameObject(null);
            loadQuestion();            
            curr_score = score.scoreInt;
            qpanel.SetActive(true);
            movement.enabled = false;
            StartCoroutine(QuestionDelay());
        }
    }

    IEnumerator QuestionDelay()
    {
        yield return new WaitForSeconds(5f);
        if (checkAnswer(curr_ans, true))
        {
            curr_score += 50;
        }
        yield return new WaitForSeconds(1.5f);
        score.scoreInt = curr_score;
        curr_ans = null;
        movement.enabled = true;
        qpanel.SetActive(false);
    }

    public void click_A()
    {
        curr_ans = "A";
        Debug.Log("Clicked A");
        checkAnswer(curr_ans, false);
    }

    public void click_B()
    {
        curr_ans = "B";
        Debug.Log("Clicked B");
        checkAnswer(curr_ans, false);     
    }

    public void click_C()
    {
        curr_ans = "C";
        Debug.Log("Clicked C");
        checkAnswer(curr_ans, false);
    }

    public void click_D()
    {
        curr_ans = "D";
        Debug.Log("Clicked D");
        checkAnswer(curr_ans, false);
    }

    public void loadQuestion()
    {
        curr_question = firebase.getQuestion();
        if (!checkQuestionEmpty(curr_question))
        {
            Debug.Log("Firebase Questions Empty");
        } 
        else
        {
            Debug.Log("Success Getting Question");
            Debug.Log(curr_question.question);
            qtitle.text = curr_question.question;
            ans1.text = curr_question.answer1;
            ans2.text = curr_question.answer2;
            ans3.text = curr_question.answer3;
            ans4.text = curr_question.answer4;
        }
    }

    bool checkQuestionEmpty(Question quest)
    {
        return (quest.answer1 != null && quest.answer2 != null &&
            quest.answer3 != null && quest.answer4 != null &&
            quest.correct != null && quest.question != null); 
    }

    string answerToLetterConvert()
    {
        string letter = "None";
        if (curr_question != null)
        {
            if (string.Equals(curr_question.answer1, curr_question.correct))
            {
                letter = "A";

            }
            else if (string.Equals(curr_question.answer2, curr_question.correct))
            {
                letter = "B";

            }
            else if (string.Equals(curr_question.answer3, curr_question.correct))
            {
                letter = "C";

            }
            else if (string.Equals(curr_question.answer4, curr_question.correct))
            {
                letter = "D";

            }
        }
        return letter;
    }

    bool checkAnswer(string ans, bool complete)
    {
        if (ans != null)
        {
            if (ans.Equals(answerToLetterConvert()))
            {
                if (complete)
                {
                    qtitle.text = "Correct Answer! +50 Points";
                }
                return true;
            }
            else if (!ans.Equals(answerToLetterConvert()))
            {
                if (complete)
                {
                    qtitle.text = "Incorrect Answer!";
                }
                return false;
            }
        }        
        else
        {
            if (complete)
            {
                qtitle.text = "No Answer Inputted!";
            }
            return false;
        }
        return false;
    }
}


