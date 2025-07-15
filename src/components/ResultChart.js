import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function ResultChart({ poll }) {
  if (!poll || !poll.options) return null;

  const data = {
    labels: poll.options.map(opt => opt.text),
    datasets: [
      {
        label: 'Votes',
        data: poll.options.map(opt => opt.votes),
        backgroundColor: '#1f6feb',
        borderColor: '#1f6feb',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#c9d1d9', 
          font: { size: 14 }
        }
      },
      tooltip: {
        backgroundColor: '#161b22',
        titleColor: '#f0f6fc',
        bodyColor: '#c9d1d9',
        borderColor: '#30363d',
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        ticks: { color: '#c9d1d9' },
        grid: { color: '#30363d' }
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: '#c9d1d9'
        },
        grid: { color: '#30363d' }
      }
    }
  };

  return (
    <div style={{ marginTop: '30px', background: '#0d1117', padding: '20px', borderRadius: '8px' }}>
      <h3 style={{ color: '#f0f6fc', marginBottom: '15px' }}>Poll Analytics</h3>
      <div style={{ height: '300px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
