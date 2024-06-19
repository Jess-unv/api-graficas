import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const ParidadPesoDolar = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const response = await axios.get('https://v6.exchangerate-api.com/v6/4c8334a0f1b886f314f4044a/latest/USD');
        const rates = response.data.conversion_rates;
        const pesoToDollar = rates.MXN;

        
        const chartData = {
          labels: ['Peso Mexicano (MXN)', 'Dolar Estadounidense (USD)'],
          datasets: [{
            label: 'Paridad Peso/Dolar',
            data: [1, pesoToDollar],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)'   
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
          }]
        };

        setData(chartData);
      } catch (error) {
        console.error('Error al obtener la paridad peso/dolar', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Paridad Peso/Dolar</h2>
      {data && (
        <Bar
          data={data}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false }, 
              title: { display: true, text: 'Comparación Peso Mexicano (MXN) vs Dolar Estadounidense (USD)' }
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Valor'
                }
              }
            }
          }}
        />
      )}
    </div>
  );
};

export default ParidadPesoDolar;
