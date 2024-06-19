import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const IndicadoresBMV = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const apiKey = '08LHLAYNYPGT5V4M';
    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=${apiKey}`)
      .then(response => {
        const timeSeries = response.data['Time Series (Daily)'];
        if (!timeSeries) {
          throw new Error('Los datos de Time Series (Daily) no se encontraron');
        }
        const labels = Object.keys(timeSeries);
        const values = labels.map(date => timeSeries[date]['4. close']);
        setData({
          labels,
          datasets: [
            {
              label: 'Indicadores BMV',
              data: values,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              fill: true,
            }
          ]
        });
      })
      .catch(error => console.error('Error al obtener indicadores de la BMV', error));
  }, []);

  return (
    <div>
      <h2>Indicadores de la bolsa de valores BMV</h2>
      <Line
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Indicadores de BMV' }
          },
          scales: {
            x: { type: 'category' },
            y: { type: 'linear' }
          }
        }}
      />
    </div>
  );
};

export default IndicadoresBMV;
