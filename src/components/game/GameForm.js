import React, { useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { createGame, getGameTypes } from "./GameManger"

export const GameForm = () => {
    const history = useHistory()
    const [gameType, setGameType] = useState([])

    /*
        Since the input fields are bound to the values of 
        the properties of this state variable, you need to
        provide some default values.
    */
   const [currentGame, setCurrentGame] = useState({
       skillLevel: 1,
       numberOfPlayers: 0,
       title: "",
       maker: "",
       gameTypeId: 0
   })

   const loadTypes = () => {
        getGameTypes().then(data => {setGameType(data)
        console.log(gameType)})
    }

   //Leigha
   useEffect(() => {
       //TODO: Get the games types, then set the state
       loadTypes()
   }, [])

   
//    //Alex
//    useEffect(() => {
//         //TODO: Get the games types, then set the state
//         getGameTypes().then(setGameTypes())
//     }, [])
   

   const changeGameState = (domEvent) => {
       //TODO: Complete the onChange function
       const newGame = { ...currentGame }
       let selectedVal = domEvent.target.value

       if (domEvent.target.id.includes("Id")) {
           selectedVal = parseInt(selectedVal)
       }

       newGame[domEvent.target.id] = selectedVal
       // update state
       setCurrentGame(newGame)
    }

   return (
       <form className="gameForm">
           <h2 className="gameForm__title">Register New Game</h2>
           <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" 
                        onChange={changeGameState}
                        required autoFocus className="form-control"
                        value={currentGame.title}
                        placeholder="Enter Title Here"
                        />
                    </div>
                </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Maker:</label>
                    <input type="text" id="maker" 
                        onChange={changeGameState}
                        required autoFocus className="form-control"
                        value={currentGame.maker}
                        placeholder="Enter Maker Here"
                        />
                    </div>
                </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number">Number of Players:</label>
                    <input type="number" id="numberOfPlayers" 
                        onChange={changeGameState}
                        required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        />
                    </div>
                </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number">Skill Level:</label>
                    <input type="number" id="skillLevel" 
                        onChange={changeGameState}
                        required autoFocus className="form-control"
                        value={currentGame.skillLevel}
                        />
                    </div>
                </fieldset>

            <fieldset>
				<div className="form-group">
					<label htmlFor="gameType">Game Type: </label>
					<select value={currentGame.gameTypeId} 
                            name="gameType" id="gameTypeId" 
                            onChange={changeGameState} 
                            className="form-control" >
                                <option value="0">Select a Game Type</option>
                                {gameType.map(gt => (
                                    <option key={gt.id} value={gt.id}>
                                        {gt.label}
                                    </option>
                                ))}
                        </select>
                    </div>
                </fieldset>

        {/* TODO: create the rest of the input fields */}

        <button type="submit"
            onClick={evt => {
                // Prevent form from being submitted
                evt.preventDefault()

                const game = {
                    game_type: parseInt(currentGame.gameTypeId),
                    title: currentGame.title,
                    maker: currentGame.maker,
                    number_of_players: parseInt(currentGame.numberOfPlayers),
                    skill_level: parseInt(currentGame.skillLevel)
                }

                //Send POST request to your API
                createGame(game)
                    .then(() => history.push("/games"))
            }}
            className="btn btn-primary">Create Game</button>
       </form>
   )

}