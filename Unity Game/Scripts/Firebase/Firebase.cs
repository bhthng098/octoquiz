using System;
using System.Collections;
using System.Collections.Generic;
using Random=UnityEngine.Random;
using UnityEngine;
using UnityEngine.Networking;

public class Firebase : MonoBehaviour
{
    public static Question[] questions;
    public string message;

    //Use this code for testing, but make sure to COMMENT OUT for production build
    /**
    void Update() {
        if (Input.GetKeyDown(KeyCode.Q)) {
            getQuestions(""); // no game code
        }
        
        if (Input.GetKeyDown(KeyCode.W)) {
            getQuestions("123456"); // invalid game code
        }
        
        if (Input.GetKeyDown(KeyCode.E)) {
            getQuestions("957863"); // valid game code
        }
    }
    **/
   
    public Question getQuestion() {
        return questions[Random.Range(0, questions.Length)];
    }

    public void initializeQuestions(string gamecode)
    {
        message = "Loading...";
        questions = new Question[0]; // clear current questions
        if (gamecode.Equals("")) {
            Debug.Log("ERROR: No Game Code Entered");
            message = "ERROR: No Game Code Entered";
        } else {
            GenerateRequest("https://final-test-7e351-default-rtdb.firebaseio.com/games/" + gamecode + ".json");
            //GenerateRequest("https://final-test-7e351-default-rtdb.firebaseio.com/.json");
        }
    }

    private void GenerateRequest(string uri)
    {
        StartCoroutine(ProcessRequest(uri));
    }

    private IEnumerator ProcessRequest(string uri)
    {
        using (UnityWebRequest request = UnityWebRequest.Get(uri))
        {
            yield return request.SendWebRequest();

            if (request.result == UnityWebRequest.Result.ConnectionError)
            {
                Debug.Log(request.error);
            }
            else
            {
                string gameJson = request.downloadHandler.text;
                if (gameJson != "null") {
                    string questionsJson = getQuestionsJson(gameJson);
                    questions = JsonHelper.FromJson<Question>(questionsJson);
                    Debug.Log("SUCCESS: Questions Loaded");
                    message = "SUCCESS: Questions Loaded";
                } else {
                    Debug.Log("ERROR: No Game Found For Game Code");
                    message = "ERROR: No Game Found For Game Code";
                }
            }
        }
    }

    private string getQuestionsJson(string json) {
        string removedOuterBraces = json.Substring(1, json.Length - 2);
        string removedInternal = getQuestionsJsonHelper(removedOuterBraces);
        string removedFinalComma = removedInternal.Remove(removedInternal.Length - 1);
        return "{\"Items\": [" + removedFinalComma + "]}";
    }

    private string getQuestionsJsonHelper(string json) {
        int openBrace = json.IndexOf("{");
        int closeBrace = json.IndexOf("}");
        int length = closeBrace - openBrace;
        if (openBrace == -1) {
            return "";
        } else {
            string first = json.Substring(openBrace, length + 1);
            string end = json.Substring(closeBrace + 1);
            return first + "," + getQuestionsJsonHelper(end);
        }
    }
}
