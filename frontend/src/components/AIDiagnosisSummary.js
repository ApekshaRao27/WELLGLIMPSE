import React, { useEffect, useState } from 'react';
import { fetchUserScores } from '../fetchUserScores';
import { generateChartUrl } from '../generateChartUrl';

const RiskGraph = () => {
  const [chartUrl, setChartUrl] = useState("");

  useEffect(() => {
    const loadChart = async () => {
      const scores = await fetchUserScores();
      if (scores.length > 0) {
        const url = generateChartUrl(scores);
        setChartUrl(url);
      }
    };
    loadChart();
  }, []);

  return (
  <div className="flex-fill chart container py-3">
      <p className="h5 text-center mb-4">Your Diabetes Risk Trend</p>
      {chartUrl ? (
        <img
          src={chartUrl}
          alt="Risk Chart"
          className="img-fluid mx-auto d-block rounded shadow"
          style={{ maxHeight: '800px' }}
        />
      ) : (
        <p className="text-muted text-center">No data available to show chart.</p>
      )}
    </div>

  );
};

export default RiskGraph;
