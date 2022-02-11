import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import axios from "axios"

import "./venue_slider.css";


const breakPoints = [
  { width: 350, itemsToShow: 1 },

];


function Testimonials(props) {
  //- const [getBirds, setGetBirds] = useState([])
  //- const {image} = props
  // +
  const [venuesList, setVenuesList] = useState([]);

  const fetchVenues = async () => {
    const data = await axios.get(`http://127.0.0.1:5000/venues`)
    const { venues } = data.data
    setVenuesList(venues);
  }
  useEffect(() => {
    fetchVenues(); 
  },[])

  return (
    <div className="Styler">
      <div className="controls-wrapper">
      </div>
      <hr className="seperator" />
      <div className="carousel-wrapper">
        <Carousel breakPoints={breakPoints} 
        onChange={(currentItem, pageIndex) => fetchVenues()}
          >
          {venuesList.map((venue) => {
          if (venuesList.length > 0) {
            return (
              <Item key={venue.id} >{venue.description}
              <button>Borrow</button> 
              </Item>  
            )
          } else {
          return (
              <Item> These are the Venues! </Item>
              )
            }
          })
          }
        </Carousel>
      </div>
    </div>
  );
}

export default Testimonials;