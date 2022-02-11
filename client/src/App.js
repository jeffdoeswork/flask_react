import React, {useState, useEffect} from 'react';
import axios from "axios"
import {format} from "date-fns"
import Event from './components/Event.js';
import Venue from './components/Venue2.js';
import './App.css';
import Testimonials from './components/slider/3slider.js'

function App()  {
return (
  <>
  <h1 className="Party">The Party Method</h1>
  <Venue />
  <br></br>
  <Event />
  </>
   );
}

export default App;
