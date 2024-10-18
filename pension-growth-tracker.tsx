'use client'

import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function PensionTracker() {
  const [initialAmount, setInitialAmount] = useState(10000)
  const [monthlyContribution, setMonthlyContribution] = useState(500)
  const [years, setYears] = useState(30)
  const [annualReturn, setAnnualReturn] = useState(7)
  const [pensionGrowth, setPensionGrowth] = useState([])

  const calculatePensionGrowth = () => {
    let growth = []
    let balance = initialAmount
    for (let i = 0; i <= years; i++) {
      growth.push({ year: i, balance: Math.round(balance) })
      balance = balance * (1 + annualReturn / 100) + monthlyContribution * 12
    }
    setPensionGrowth(growth)
  }

  const chartData = {
    labels: pensionGrowth.map(data => `Year ${data.year}`),
    datasets: [
      {
        label: 'Pension Balance',
        data: pensionGrowth.map(data => data.balance),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Pension Growth Over Time',
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Pension Growth Tracker
        </h1>
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Input Pension Details</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="initialAmount" className="block text-sm font-medium text-gray-700">
                Initial Amount (£)
              </label>
              <input
                type="number"
                id="initialAmount"
                value={initialAmount}
                onChange={(e) => setInitialAmount(Number(e.target.value))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="monthlyContribution" className="block text-sm font-medium text-gray-700">
                Monthly Contribution (£)
              </label>
              <input
                type="number"
                id="monthlyContribution"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="years" className="block text-sm font-medium text-gray-700">
                Years to Grow
              </label>
              <input
                type="number"
                id="years"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="annualReturn" className="block text-sm font-medium text-gray-700">
                Annual Return (%)
              </label>
              <input
                type="number"
                id="annualReturn"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(Number(e.target.value))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <button
            onClick={calculatePensionGrowth}
            className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Calculate Growth
          </button>
        </div>
        {pensionGrowth.length > 0 && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Pension Growth Projection</h2>
            <div className="mb-6">
              <Line data={chartData} options={chartOptions} />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Year
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Balance
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pensionGrowth.map((data) => (
                    <tr key={data.year}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.year}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        £{data.balance.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}