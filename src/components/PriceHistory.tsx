import React from 'react';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PriceHistoryProps {
  data: { date: string; price: number }[];
}

const PriceHistory: React.FC<PriceHistoryProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: 'Precio',
        data: data.map(item => item.price),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Historial de Precios'
      }
    }
  };

  return (
    <div className="mt-8">
      <h3 className="font-bold text-lg mb-4">Historial de Precios</h3>
      <Line data={chartData} options={options} />
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Configurar Alerta de Precio
      </button>
    </div>
  );
};

export default PriceHistory;