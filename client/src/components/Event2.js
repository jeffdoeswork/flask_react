import React, {useState, useEffect} from 'react';
import axios from "axios"
import {format} from "date-fns"
import './Event.css';
import Testimonials from './slider/3slider.js'
import "./slider/event_slider.css";
import Item from "./slider/event_Item";
import Carousel from "react-elastic-carousel";


const baseURL = "http://localhost:5000"

function Event() {
  const [description, setDescription] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [eventsList, setEventsList] = useState([]);
  const [eventId, setEventId] = useState(null);

  const fetchEvents = async () => {
    const data = await axios.get(`http://127.0.0.1:5000/events`)
    const { events } = data.data
    setEventsList(events);
  }

  const handleChangeEdit = (e, field) =>  {
      setEditDescription(e.target.value);
    }
    
  const handleChange = (e, field) => {
      setDescription(e.target.value);
    }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/events/${id}`)
      const updatedList = eventsList.filter(event => event.id !== id)
      setEventsList(updatedList);
    } catch (err) {
      console.error(err.message)
    }
  }

  const toggleEdit = (event) => {
    setEventId(event.id);
    setEditDescription(event.description)
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.put(`http://127.0.0.1:5000/events/${eventId}`, {description: editDescription})
      const updatedEvent = data.data.event;
      const updatedList = eventsList.map(event => {
        if (event.id === eventId) {
          return event = updatedEvent
        }
        return event
      })
      setEventsList(updatedList)
      setDescription('');
      setEditDescription('');
      setEventId(null);
  } catch (err) {
    console.error(err.message);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(`http://127.0.0.1:5000/events`, {description})
      setEventsList([...eventsList, data.data]);
      setDescription('');
  } catch (err) {
    console.error(err.message); 
    }
  }

  useEffect(() => {
    fetchEvents(); 
  }, [])

  const breakPoints = [
    { width: 350, itemsToShow: 1 },
  
  ];

  function Pagination({ pages, activePage, onClick }) {
    console.log("activePage", activePage);
    return (
      <div style={{display: 'flex'}}>

        {pages.map(page => {
          const isActivePage = activePage === page
          return (
            <div 
              className="spacer"
              key={page}
              onClick={() => onClick(page)}
              active={isActivePage}>

              <a className="horz_event">{page + 1}</a>

            </div>
          )
        })}
      </div>
      
    );
  }

  return (
    <div className="Event">
      <section>
        <form onSubmit={handleSubmit}>
          <h2>Event</h2>
          <input
            onChange={(e) => handleChange(e, "description")}
            type="text"
            name="description"
            id="description"
            value={description}
          />
          <br></br>
          <button type="submit">Submit</button>
        </form>
      </section>
      <br></br>

      <div className="Styler">
      <div className="controls-wrapper">
      </div>
      <div className="carousel-wrapper">
        <Carousel 
        breakPoints={breakPoints}
        renderPagination={Pagination}
         >
          {eventsList.map((event) => {
            if (eventId === event.id) {
              return (
                <Item>
                <form onSubmit={handleEdit} key={event.id}> 
                  <input
                    onChange={(e) => handleChangeEdit(e, "edit")}
                    type="text"
                    name="description"
                    id="editDescription"
                    placeholder='Describe the event'
                    value={editDescription}
                    />
                    <button type='submit'>Submit</button>
                </form>
                </Item>
              )
            } else {
              return (
                <div>
                <Item key={event.id}>
                <div className="sub_event">
                  {event.description} 
                </div>
                </Item>
                <button onClick={() => toggleEdit(event)}>Edit</button>
                <button className="exit_button" onClick={() => handleDelete(event.id)}>Delete</button>
                </div>
                )
            }
          })}
       </Carousel>
      </div>
    </div>
    </div>
  );
}

export default Event;
