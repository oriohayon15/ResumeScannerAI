import React, { useState } from 'react';

const ApplicationInput = ({value, onChange}) => {
    return (
        <div>
            <label>Paste Job description</label>
            <textarea 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder='Place Job Description here'
            style={{ width: "100%" }}/>
        </div>
    );
}

export default ApplicationInput;