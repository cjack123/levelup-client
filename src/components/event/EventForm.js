import React, { useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { createEvent, getEvents} from "./EventManager"

export const EventForm = () => {
    const history = useHistory()
    const [event, setEvent] = useState([])

    const [currentEvent, setCurrentEvent] = useState({
        game: 0,
        description: "",
        date_time: "",
        organizer: 1
    })

    const loadTypes = () => {
        getEvents().then(data => {setEvent(data)
        console.table(event)})
    }

    useEffect(() => {
        loadTypes()
    }, [])


    const changeEventState = (domEvent) => {
        //TODO: Complete the onChange function
        const newEvent = { ...currentEvent }
        let selectedVal = domEvent.target.value
 
        if (domEvent.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
 
        newEvent[domEvent.target.id] = selectedVal
        // update state
        setCurrentEvent(newEvent)
    }

    return (
       <form className="eventForm">
           <h2 className="eventForm__title">Register New Event</h2>
           <fieldset>
				<div className="form-group">
					<label htmlFor="game">Game: </label>
					<select value={currentEvent.game} 
                            name="game" id="game" 
                            onChange={changeEventState} 
                            className="form-control" >
                                <option value="0">Select a Game</option>
                                {event.map(event => (
                                    <option key={event.id} value={event.game.id}>
                                        {event.game.title}
                                    </option>
                                ))}
                        </select>
                    </div>
                </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input type="text" id="description" 
                        onChange={changeEventState}
                        required autoFocus className="form-control"
                        value={currentEvent.description}
                        placeholder="Enter Description Here"
                        />
                    </div>
                    </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date_time">Date and Time:</label>
                    <input type="datetime-local" id="date_time" 
                        onChange={changeEventState}
                        required autoFocus className="form-control"
                        value={currentEvent.date_time}
                        />
                    </div>
                    </fieldset>
                {/* <fieldset>
                <div className="form-group">
                    <label htmlFor="organizer">Date and Time:</label>
                    <input type="organizer" id="organizer" 
                        onChange={changeEventState}
                        required autoFocus className="form-control"
                        value={currentEvent.organizer.user.first_name}
                        />
                    </div>
                    </fieldset> */}

            <button type="submit"
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()

                            const event = {
                                game: parseInt(currentEvent.game),
                                description: currentEvent.description,
                                date_time: currentEvent.date_time,
                                organizer: parseInt(currentEvent.organizer)
                            }

                            //Send POST request to your API
                            createEvent(event)
                                .then(() => history.push("/events"))
                        }}
                        className="btn btn-primary">Create Event</button>
       </form> 
    )

}