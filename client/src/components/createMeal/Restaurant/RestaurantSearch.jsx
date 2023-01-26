import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../Navbar.jsx';

const RestaurantSearch = ({}) => {
  const [location, setLocation] = useState('');
  const [restName, setRestName] = useState('');
  const [restAddress, setRestAddress] = useState('')
  const [businesses, setBusinesses] = useState([]);

  return (
    <div>
      <Navbar />
      <p>This is where the search will be.</p>
    </div>
  )
}



export default RestaurantSearch;