import { useState } from 'react'
import './App.css'
import ResumeUpload from './components/ResumeUpload'
import ApplicationInput from './components/ApplicationInput'
import ScoreResults from './components/scoreResults'

function App() {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null); 
  console.log("App result:", result);

  return (
    <>
      <div >
      <h1 className="mb-4 text-center text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">ResumeScannerAI</h1>
      <p className="text-gray-600 text-lg">Match your resume with job descriptions using AI</p>
      <div className='flex'>
          <div className='w-1/2 p-6'>
            <ResumeUpload jobDescription={jobDescription} onResult={setResult} />
          </div>
          <div className='w-1/2 p-6'>
            <ApplicationInput value={jobDescription} onChange={setJobDescription} />
          </div>
      </div>
      <div>
            <ScoreResults results={result} />
          </div>
      </div>
    </>
  )
}

export default App
