import { useState } from 'react'
import './App.css'
import ResumeUpload from './components/ResumeUpload'
import ApplicationInput from './components/ApplicationInput'
import ScoreResults from './components/scoreResults'

function App() {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null); 

  return (
    <>
      <div>
      <h1>ResumeScannerAI</h1>
      <div class='flex'>
          <div class='w-1/2 p-6'>
            <ResumeUpload jobDescription={jobDescription} onResult={setResult} />
          </div>
          <div class='w-1/2 p-6'>
            <ApplicationInput value={jobDescription} onChange={setJobDescription} />
          </div>
          <ScoreResults score={result} />
      </div>
      </div>
    </>
  )
}

export default App
