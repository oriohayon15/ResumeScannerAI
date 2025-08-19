import { useState } from 'react'
import './App.css'
import ResumeUpload from './components/ResumeUpload'
import ApplicationInput from './components/ApplicationInput'

function App() {
  const [jobDescription, setJobDescription] = useState("");

  return (
    <>
      <div>
      <h1>ResumeScannerAI</h1>
      <div class='flex'>
          <div class='w-1/2 p-6'>
            <ResumeUpload jobDescription={jobDescription} />
          </div>
          <div class='w-1/2 p-6'>
            <ApplicationInput value={jobDescription} onChange={setJobDescription} />
          </div>
      </div>
      </div>
    </>
  )
}

export default App
