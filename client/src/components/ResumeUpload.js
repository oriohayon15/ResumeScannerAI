import React, { useState } from 'react';
import axios from 'axios';

const UPLOAD_URL = "http://127.0.0.1:5000/extract";
const MAX_SIZE_MB = 10; 

const ResumeUpload = () => {

    const [file, setFile] = useState(null)
    const [error, setError] = useState("")
    const [uploading, setUploading] = useState(false)

    const handleFileChange = (event) => {
        //get first file from the inputs
        const chosen = event.target.files && event.target.files[0];

        //return an error if could not find file
        if (!chosen) {
            setError("No file selected.");
            setFile(null);
            return
        }

        //makes sure only pdf documents work
        const nameLower = chosen.name.toLowerCase();
        if (!nameLower.endsWith(".pdf")) {
            setError("PDF Documents Only (.pdf).");
            setFile(null)
            return;
        }

        //size check
        const maxBytes = MAX_SIZE_MB * 1024 * 1024;
        if (chosen.size > maxBytes) {
            setError(`File too large must be below ${MAX_SIZE_MB} MB.`);
            setFile(null)
            return
        }
        
        //Once it passes all checks will be set to no error and the file will be set
        setError("");
        setFile(chosen);
    }

    const handleUpload = () => {
        //Making sure file is submitted
        if (!file) {
            setError("Please select a PDF file first.");
            return
        }
        else {
            setError("");
            setUploading(true);
        }

        //Building form data 
        const form = new FormData();
        form.append("resume", file);
        form.append("job", "temp job description") //temp hardcoded 

        //sending the form to the backend
        axios.post(UPLOAD_URL, form, {
            onUploadProgress: (progressEvent) => {
                const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(`Upload progress: ${percent}%`);
            }
        })
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            setError("Upload failed. Please try again.");
            console.log(err);
        })
        .finally(() => {
            setUploading(false)
        });
    }

    return (
        <div>
            <p>Upload your resume (PDF)</p>
            <input type='file' accept='.pdf' onChange={handleFileChange}/>

            {/* Show filename & size if file is selected */}
            {file && (<p> Selected: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)</p>)}

            {/* Show error message if one */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload & Analyze"}
            </button>
        </div>

    );
};

export default ResumeUpload;