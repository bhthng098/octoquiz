using UnityEngine;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{
    bool ended = false;

    public float delay = 1f;
    public GameObject qpanel;
    public GameObject endPanel;

    // Start is called before the first frame update
    void Start()
    {
        qpanel.SetActive(false);
        endPanel.SetActive(false);
    }

    public void EndGame()
    {
        Debug.Log("End");
        if (ended == false)
        {
            ended = true;
            Invoke("Restart", delay);
        }
    }

    void Restart()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
        Debug.Log("Restarted");
    }
}
