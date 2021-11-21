import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './routes/Home'
import ShortListed from './routes/ShortListed'
import Rejected from './routes/Rejected'
import InfoCard from './components/InfoCard'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='shortlisted' element={<ShortListed />} />
        <Route path='rejected' element={<Rejected />} />
        <Route path=':id' element={<InfoCard />} />
      </Routes>
    </Router>
  )
}

export default App
