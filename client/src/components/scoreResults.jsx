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

  const score = typeof numeric === 'number' ? numeric : 0;
  const radius = 80;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* Score Circle */}
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-3">
                <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 140 140">
                  {/* Background circle */}
                  <circle
                    cx="70"
                    cy="70"
                    r={radius * 0.7}
                    stroke="#e5e7eb"
                    strokeWidth={strokeWidth * 0.7}
                    fill="none"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="70"
                    cy="70"
                    r={radius * 0.7}
                    stroke={score >= 70 ? "#10b981" : score >= 50 ? "#f59e0b" : "#ef4444"}
                    strokeWidth={strokeWidth * 0.7}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference * 0.7}
                    strokeDashoffset={(circumference * 0.7) - (score / 100) * (circumference * 0.7)}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${score >= 70 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {typeof numeric === 'number' ? Math.round(numeric) : 'N/A'}
                    </div>
                    <div className="text-gray-500 text-xs">out of 100</div>
                  </div>
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-700 mb-1">Match Score</h2>
              <p className={`text-xs font-medium ${score >= 70 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                {score >= 70 ? 'Excellent Match!' : score >= 50 ? 'Good Match' : 'Needs Improvement'}
              </p>
            </div>

            {/* Keywords Section */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-700">Suggested Keywords To Add</h3>
              <div className="bg-white/60 rounded-2xl p-3 max-h-40 overflow-y-auto">
                {Array.isArray(keywords) && keywords.length > 0 ? (
                  <div className="space-y-1">
                    {keywords.map((kw, i) => (
                      <div key={i} className="bg-white/80 rounded-lg px-2 py-1 text-xs text-gray-700 shadow-sm">
                        {kw}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className="text-2xl mb-1">🎉</div>
                    <p className="text-gray-600 text-sm font-medium">No missing keywords!</p>
                  </div>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreResults;
