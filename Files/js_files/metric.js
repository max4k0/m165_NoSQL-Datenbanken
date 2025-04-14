const express = require('express');
const metric = express();
const port = 5000;

metric.get('/metrics', (req, res) => {
  const randomMetric = Math.floor(Math.random()*100);
  res.json({ metric: randomMetric });
});

metric.listen(port, '0.0.0.0', () => {
  console.log(`api: http://localhost:${port}`);
});
