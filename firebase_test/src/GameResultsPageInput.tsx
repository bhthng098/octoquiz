import React, {Dispatch, SetStateAction} from 'react'

function GameResultsPageInput(props: {UserInputID : string
    setUserInputID: Dispatch<SetStateAction<string>> }) {

    return (
        <div>
            <label htmlFor="inputbox" id="roomCode"> <br></br></label>
            <input className="roomInputBox" type="text" name="inputbox" id="roomCode" onChange={event => {
                props.setUserInputID(event.target.value)
            }}
            />
            <label htmlFor="inputbox" id="roomCode"> <br></br> Room code</label>
        </div>
    )
}

export default GameResultsPageInput;