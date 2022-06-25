import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getEvents } from "./EventManager.js"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => (setEvents(data), console.log(data)))
    }, [])

    const history = useHistory()

    return (
        <>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                history.push("/events/new")
            }}>Register New Event
        </button>

        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__title">{event.game.title}</div>
                        <div className="event__description">{event.description}</div>
                        <div className="event__date-time">Skill level is {event.date_time}</div>
                        <div className="event__organizer">Skill level is {event.organizer.user.first_name}</div>
                        <br></br>
                    </section>
                })
            }
        </article>
        </>
    )
}