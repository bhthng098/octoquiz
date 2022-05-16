  using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    public Rigidbody rb;

    public float force = 800f;

    public float sideForce = 30f;

    // Propelling force for the player, Fixed for physics
    void FixedUpdate()
    {
        rb.AddForce(0, 0, force * Time.deltaTime);
        if (Input.GetKey("d") || Input.GetKey("right"))
        {
            rb.AddForce(sideForce * Time.deltaTime, 0, 0, ForceMode.VelocityChange);
        }

        if (Input.GetKey("a") || Input.GetKey("left"))
        {
            rb.AddForce(-sideForce * Time.deltaTime, 0, 0, ForceMode.VelocityChange);
        }

        //End Game for Falling Off Edge
        if (rb.position.y < -1f)
        {
            FindObjectOfType<GameManager>().EndGame();
        }
    }
}
