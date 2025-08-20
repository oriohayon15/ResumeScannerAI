import React from 'react';

const ScoreResults = ({score}) => {
    return (
        <div>
        <h2>Score: {score == null ? "—" : typeof score === "number" ? score.toFixed(2) : String(score)}</h2>
      </div>
    )
}

export default ScoreResults