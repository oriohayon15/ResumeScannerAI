import React, { useState } from 'react';
import axios from 'axios';

const UPLOAD_URL = "http://127.0.0.1:5000/extract";
const MAX_SIZE_MB = 10; 

const ResumeUpload = ({ jobDescription, onResult  }) => {

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
        form.append("job", jobDescription) 

        //sending the form to the backend
        axios.post(UPLOAD_URL, form, {
            onUploadProgress: (progressEvent) => {
                const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(`Upload progress: ${percent}%`);
            }
        })
        .then((res) => {
            console.log(res.data);
            onResult?.(res.data);
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
        <div className="flex-1 p-8 flex items-center justify-center min-h-screen bg-gradient-to-br">
            <div className="w-full max-w-2xl">
                <input type='file' accept='.pdf' onChange={handleFileChange} className="hidden" id="file-input"/>
                
                <label 
                    htmlFor="file-input"
                    className={`
                        group relative cursor-pointer
                        w-full h-96 rounded-3xl border-2 border-dashed
                        flex flex-col items-center justify-center
                        transition-all duration-300 transform
                        ${file && !error
                            ? 'border-green-400 bg-green-50 hover:bg-green-100 hover:border-green-500 hover:scale-105 hover:shadow-xl'
                            : error
                                ? 'border-red-400 bg-red-50'
                                : uploading
                                    ? 'border-blue-400 bg-blue-50'
                                    : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50 hover:scale-105 hover:shadow-xl'
                        }
                    `}
                >
                    {/* Background decoration */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Main content */}
                    <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                        {/* Icon */}
                        <div className="p-6 rounded-full bg-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                            {uploading ? (
                                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            ) : file && !error ? (
                                <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ) : error ? (
                                <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ) : (
                                <svg className="w-16 h-16 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            )}
                        </div>
                        
                        {/* Main text */}
                        <h2 className={`
                            text-3xl font-bold
                            ${uploading 
                                ? 'text-blue-600' 
                                : file && !error 
                                    ? 'text-green-600' 
                                    : error 
                                        ? 'text-red-600' 
                                        : 'text-gray-700 group-hover:text-blue-600'
                            }
                            transition-colors duration-300
                        `}>
                            {uploading ? "Analyzing Your Resume..." : file && !error ? "Ready to Analyze" : error ? "Upload Error" : "Upload Your Resume"}
                        </h2>
                        
                        {/* Sub text */}
                        <p className={`
                            text-lg font-medium max-w-md
                            ${uploading 
                                ? 'text-blue-500' 
                                : file && !error 
                                    ? 'text-green-600' 
                                    : error 
                                        ? 'text-red-500' 
                                        : 'text-gray-500 group-hover:text-gray-700'
                            }
                            transition-colors duration-300
                        `}>
                            {uploading 
                                ? "This may take a few moments" 
                                : file && !error 
                                    ? `${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`
                                    : error 
                                        ? error
                                        : "Click to browse & drop your PDF file here"
                            }
                        </p>
                        
                        {/* Action text */}
                        {!uploading && (
                            <p className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors duration-300">
                                {file && !error ? "Click to select a different file" : "PDF files only • Max 10MB"}
                            </p>
                        )}
                    </div>
                    
                    {/* Subtle pulse animation for upload state */}
                    {uploading && (
                        <div className="absolute inset-0 rounded-3xl bg-blue-400 opacity-20 animate-pulse"></div>
                    )}
                </label>
                
                {/* Upload button - only show when file is selected and not uploading */}
                {file && !error && !uploading && (
                    <div className="mt-6 flex justify-center">
                        <button 
                            onClick={handleUpload}
                            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Analyze Resume
                        </button>
                    </div>
                )}
                
                {/* Additional info section */}
                <div className="mt-8 text-center">
                    <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>PDF Format</span>
                        </div>
                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                        <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <span>Up to 10MB</span>
                        </div>
                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                        <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Secure & Private</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeUpload;