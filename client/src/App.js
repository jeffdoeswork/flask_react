import React, {useState, useEffect} from 'react';
import axios from "axios"
import {format} from "date-fns"
import './App.css';

const baseURL = "http://localhost:5000"

function App() {
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

  return (
    <div className="App">
      <section>
        <form onSubmit={handleSubmit}>
          <h2>Description</h2>
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
      <section>
        
        <ul>
          {eventsList.map(event => {
            if (eventId === event.id) {
              return (
                <li>
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
                </li>
              )
            } else {
              return (
                <li key={event.id}>
                  {event.description}
                  <button onClick={() => toggleEdit(event)}>Edit</button>
                  <button onClick={() => handleDelete(event.id)}>X</button>
                </li>
                )
            }
          })}
        </ul>
      </section>
    </div>
  );
}

export default App;
