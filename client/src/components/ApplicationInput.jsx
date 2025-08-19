import React from 'react';
import { FileText } from 'lucide-react';

const ApplicationInput = ({value, onChange}) => {
    return (
            <div className="flex-1 p-8 flex items-center justify-center min-h-screen bg-gradient-to-bl from-gray-50 to-gray-100">
                <div className="w-full max-w-2xl">
                    <div className="relative w-full h-96 rounded-3xl border-2 border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50 hover:scale-105 hover:shadow-xl transition-all duration-300">
                        <div className="p-6 pb-4">
                            <div className="flex items-center space-x-3">
                                <div className="p-3 rounded-full bg-white shadow-lg">
                                    <FileText className="w-6 h-6 text-gray-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-700">Paste Job Description</h2>
                                    <p className="text-sm text-gray-500">Copy and paste the job posting details</p>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 pb-6 h-72">
                            <textarea
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                                placeholder="Paste the complete job description here..."
                                className="w-full h-full resize-none rounded-2xl border-0 bg-white/70 p-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white transition-all duration-300 shadow-inner"
                            />
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default ApplicationInput;