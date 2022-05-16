using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class StartCode : MonoBehaviour
{
    //public GameObject inputField;
    //public GameObject textDisplay;
    public GameObject StartPanel;
    public GameObject player;
    public string gamecode;
    public Firebase firebase;
    public TMP_InputField inputField;
    public TMP_Text message;
    string err1 = "ERROR: No Game Code Entered";
    string err2 = "ERROR: No Game Found for Game Code";
    string suc = "SUCCESS: Questions Loaded";

    void Start()
    {
        player.SetActive(false);
    }

    public void StoreCode()
    {
        gamecode = inputField.text;
    }

    public void loadGame() {
        firebase.initializeQuestions(gamecode);
    }

    public void startGame()
    {
        if (firebase.message.Equals("")) {
            message.text = "Message: Please Load in Game Data First";
        }
        else {
            message.text = firebase.message;
        }

        if (firebase.message.Equals(suc))
        {
            StartPanel.SetActive(false);
            player.SetActive(true);
        }
    }
 
}
