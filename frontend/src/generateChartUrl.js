export const generateChartUrl = (data) => {
  const labels = data.map((d) => `'${d.date}'`).join(",");
  const transformedScores = data.map((d) => (d.score * 100).toFixed(0)).join(",");

  const chartConfig = `{
    type: 'line',
    data: {
      labels: [${labels}],
      datasets: [{
        label: 'Diabetes Risk Score (%)',
        data: [${transformedScores}],
        borderColor: 'rgba(75,192,192,1)',
        fill: false
      }]
    },
    options: {
      scales: {
        y: {
          suggestedMin: 0,
          suggestedMax: 100,
          ticks: {
            stepSize: 10
          }
        }
      }
    }
  }`;

  return `https://quickchart.io/chart?c=${encodeURIComponent(chartConfig)}`;
};
