import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import RateLimitedUI from '../Components/RateLimitedUI'
import axios from 'axios'

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/notes');
        const res = await response.json();
        setNotes(res.data);
      } catch (error) {}
       // setError(error);
    //   } finally {
    //    // setIsLoading(false);
    //   }
    };
    fetchNotes();
  }, []);
  return (
    
    <div className="min-h-screen">
        <Navbar />
    {isRateLimited && <RateLimitedUI />}
    </div>
  )
}

export default HomePage