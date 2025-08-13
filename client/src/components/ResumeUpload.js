import React, { useState } from 'react';

const UPLOAD_URL = "http://localhost:5000/extract";

const ResumeUpload = () => {

    const [file, setFile] = useState()
    const [error, setError] = useState("")
    const [uploading, setUploading] = useState(false)

    const handleFileChange = (event) => {

    }

    const handleUploading = () => {

    }

    return (
        <div>Upload your resume (PDF)</div>
    );
};

export default ResumeUpload;