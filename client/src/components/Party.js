import React, {useState, useEffect} from 'react';
import axios from "axios"
import {format} from "date-fns"


const baseURL = "http://localhost:5000"


function Party() {
    const [title, setTitle] = useState("");
    const [editTitle, setEditTitle] = useState("");
  
    const [partiesList, setPartiesList] = useState([]);
    const [partyId, setPartyId] = useState(null);

    const fetchParties = async () => {
        const data = await axios.get(`http://127.0.0.1:5000/parties`)
        const { parties } = data.data
        setPartiesList(parties);
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const data = await axios.post(`http://127.0.0.1:5000/parties`, {title})
        setPartiesList([...partiesList, data.data]);
        setTitle('');
    } catch (err) {
        console.error(err.message); 
        }
    }

    const handleChange = (e, field) => {
        setTitle(e.target.value);
      }

    useEffect(() => {
        fetchParties(); 
    }, [])

  return (
    <div className="Party">
        <section>
            <form onSubmit={handleSubmit}>
                <h2>Party Title</h2>
                    <input
                        onChange={(e) => handleChange(e, "title")}
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                    />
                <br></br>
                <button type="submit">Name Party</button>
            </form>
      </section>
    </div>
  );
}

export default Party;