import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import RateLimitedUI from '../Components/RateLimitedUI'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import NoteCard from '../Components/NoteCard'


const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/notes');
       setNotes(response.data);
       setIsRateLimited(false);
        console.log(response.data);
      } catch (error) {console.log("too many requests fetching notes", error)
        if(error.response?.status === 429){
          setIsRateLimited(true);
        } else {toast.error("Error loading notes", error)}

      }
       finally {
        setIsLoading(false);
       }
    
    };
    fetchNotes();
  }, []);
  return (
    
    <div className="min-h-screen">
        <Navbar />
    {isRateLimited && <RateLimitedUI />}

<div className="container mx-auto max-w-6xl p-4">
    {isLoading && <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>}

    {notes.length > 0 && !isRateLimited && !isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
               <NoteCard key={note._id} note={note} />
            ))}
        </div>
    )}





    </div>

    </div>
  )
}

export default HomePage