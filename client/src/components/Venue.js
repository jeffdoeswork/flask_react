import React, {useState, useEffect} from 'react';
import axios from "axios"
import {format} from "date-fns"
import './Venue.css';
import Testimonials from './slider/3slider.js'

const baseURL = "http://localhost:5000"

function Venue() {
  const [description, setDescription] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [venuesList, setVenuesList] = useState([]);
  const [venueId, setVenueId] = useState(null);

  const fetchVenues = async () => {
    const data = await axios.get(`http://127.0.0.1:5000/venues`)
    const { venues } = data.data
    setVenuesList(venues);
  }

  const handleChangeEdit = (e, field) =>  {
      setEditDescription(e.target.value);
    }
    
  const handleChange = (e, field) => {
      setDescription(e.target.value);
    }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/venues/${id}`)
      const updatedList = venuesList.filter(venue => venue.id !== id)
      setVenuesList(updatedList);
    } catch (err) {
      console.error(err.message)
    }
  }

  const toggleEdit = (venue) => {
    setVenueId(venue.id);
    setEditDescription(venue.description)
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.put(`http://127.0.0.1:5000/venues/${venueId}`, {description: editDescription})
      const updatedVenue = data.data.venue;
      const updatedList = venuesList.map(venue => {
        if (venue.id === venueId) {
          return venue = updatedVenue
        }
        return venue
      })
      setVenuesList(updatedList)
      setDescription('');
      setEditDescription('');
      setVenueId(null);
  } catch (err) {
    console.error(err.message);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(`http://127.0.0.1:5000/venues`, {description})
      setVenuesList([...venuesList, data.data]);
      setDescription('');
  } catch (err) {
    console.error(err.message); 
    }
  }

  useEffect(() => {
    fetchVenues(); 
  }, [])

  return (
    <div className="Venue">
      <section>
        <form onSubmit={handleSubmit}>
          <h2>Venue</h2>
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
          {venuesList.map(venue => {
            if (venueId === venue.id) {
              return (
                <li>
                <form onSubmit={handleEdit} key={venue.id}> 
                  <input
                    onChange={(e) => handleChangeEdit(e, "edit")}
                    type="text"
                    name="description"
                    id="editDescription"
                    placeholder='Describe the venue'
                    value={editDescription}
                    />
                    <button type='submit'>Submit</button>
                </form>
                </li>
              )
            } else {
              return (
                <li key={venue.id}>
                  {venue.description}
                  <button onClick={() => toggleEdit(venue)}>Edit</button>
                  <button onClick={() => handleDelete(venue.id)}>X</button>
                </li>
                )
            }
          })}
        </ul>
      </section>
    </div>
  );
}

export default Venue;
