import React from 'react';

const ScoreResults = ({ results }) => {
  if (!results) return <div>No results yet</div>;

  // 1) Extract score
  let numeric =
    results.match_score ??
    results.result?.match_score ??
    results.score;

  // Fallback for earlier format: { "Your Match Score: ": "46.165/100" }
  if (numeric === undefined && results["Your Match Score: "]) {
    const raw = String(results["Your Match Score: "]);
    const m = raw.match(/(\d+(\.\d+)?)/); // grab first number
    numeric = m ? parseFloat(m[1]) : undefined;
  }

  // 2) Extract keywords
  let keywords =
    results.missing_keywords ??
    results.suggested_keywords ??
    results["Suggested Keywords to add"] ??
    [];

  // Normalize if backend returns a string instead of an array
  if (typeof keywords === 'string') {
    // try split by comma
    keywords = keywords.split(',').map(s => s.trim()).filter(Boolean);
  }

  return (
    <div className="p-4 rounded-lg border">
      <h2 className="text-xl font-semibold mb-2">Match Score</h2>
      <p className="text-2xl mb-4">
        {typeof numeric === 'number' ? `${numeric.toFixed(2)}/100` : 'N/A'}
      </p>

      <h3 className="text-lg font-medium mb-1">Suggested Keywords to Add</h3>
      {Array.isArray(keywords) && keywords.length > 0 ? (
        <ul className="list-disc ml-6">
          {keywords.map((kw, i) => (
            <li key={i}>{kw}</li>
          ))}
        </ul>
      ) : (
        <p>No missing keywords 🎉</p>
      )}
    </div>
  );
};

export default ScoreResults;
