import React from 'react'
import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import { toast } from 'react-hot-toast'


const App = () => {
  return (
    <div className="relative h-full w-full">
    <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />

      {/* <button className='btn btn-primary'>Click me</button> */}

      {/* <button onClick={() => toast.success("Hello")} className='bg-blue-500 text-red-500 p-2 rounded-md'> Click me</button> */}
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>



    </div>
  )
}

export default App