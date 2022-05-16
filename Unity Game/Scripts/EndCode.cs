using System.Collections;
using System.Collections.Generic;
using UnityEngine.SceneManagement;
using UnityEngine;

public class EndCode : MonoBehaviour
{
    public void restartScene() {
        SceneManager.LoadScene("SampleScene");
    }
}
