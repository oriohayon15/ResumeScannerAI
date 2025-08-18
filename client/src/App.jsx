import { useState } from 'react'
import './App.css'
import ResumeUpload from './components/ResumeUpload'
import ApplicationInput from './components/ApplicationInput'

function App() {
  const [jobDescription, setJobDescription] = useState("");

  return (
    <>
      <div>
      <h1>Resume Analyzer</h1>
      <ResumeUpload jobDescription={jobDescription} />
      <ApplicationInput value={jobDescription} onChange={setJobDescription} />
      </div>
    </>
  )
}

export default App
