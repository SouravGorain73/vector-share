import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import { Upload } from 'lucide-react'
import MyFiles from './pages/MyFiles'
import Subsciption from './pages/Subsciption'
import Transactions from './pages/Transactions'
import { SignIn } from '@clerk/react'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/dashboard" element={
          <>
          </>
        } />
        <Route path="/upload" element={<Upload/>} />
        <Route path="/myfiles" element={<MyFiles/>} />
        <Route path="/subsciption" element={<Subsciption/>} />
        <Route path="/transactions" element={<Transactions/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
