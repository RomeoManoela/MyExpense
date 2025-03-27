import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { Line, Pie } from 'react-chartjs-2'
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { fetchAnalytics } from './analyticsSlice'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
)

function Charts(): React.ReactElement {
  const dispatch: AppDispatch = useDispatch()
  const { categories, dailyExpenses, loading } = useSelector(
    (state: RootState) => state.analytics,
  )
  const { transactions } = useSelector((state: RootState) => state.transactions)

  useEffect(() => {
    dispatch(fetchAnalytics())
  }, [dispatch, transactions.length])

  const preparePieChartData = () => {
    const categoryNames = categories.map((cat) => cat.categorie)
    const montants = categories.map((cat) => cat.montant)

    const backgroundColors = [
      '#B9B28A',
      '#504B38',
      '#3A3828',
      '#8A8569',
      '#6B6748',
      '#D1CBA9',
      '#7D7A5E',
      '#9E9A7C',
      '#C5BF9A',
      '#E8E4C9',
    ]

    return {
      labels: categoryNames,
      datasets: [
        {
          data: montants,
          backgroundColor: backgroundColors.slice(0, categoryNames.length),
          borderWidth: 1,
        },
      ],
    }
  }

  const prepareLineChartData = () => {
    // Formater les dates pour l'affichage
    const formattedDays = dailyExpenses.map((day) => {
      const date = new Date(day.date)
      return date.toLocaleDateString()
    })

    const amounts = dailyExpenses.map((day) => day.montant)

    return {
      labels: formattedDays,
      datasets: [
        {
          label: 'Dépenses quotidiennes (MGA)',
          data: amounts,
          borderColor: '#504B38',
          backgroundColor: 'rgba(80, 75, 56, 0.2)',
          tension: 0.3,
        },
      ],
    }
  }

  const pieOptions = {
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#504B38',
          font: {
            size: 10,
          },
        },
      },
      title: {
        display: true,
        text: 'Répartition des dépenses par catégorie',
        color: '#504B38',
        font: {
          size: 14,
        },
      },
    },
  }

  const lineOptions = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Dépenses quotidiennes (7 derniers jours)',
        color: '#504B38',
        font: {
          size: 14,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#504B38',
        },
      },
      x: {
        ticks: {
          color: '#504B38',
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  }

  if (loading) {
    return <p className='text-center'>Chargement des données...</p>
  }

  return (
    <div className='grid grid-cols-2 gap-1'>
      <div className='h-64'>
        {categories.length > 0 ? (
          <Pie data={preparePieChartData()} options={pieOptions} />
        ) : (
          <p className='text-center italic text-gray-500'>
            Aucune donnée disponible
          </p>
        )}
      </div>

      <div className='h-64'>
        {dailyExpenses.length > 0 ? (
          <Line data={prepareLineChartData()} options={lineOptions} />
        ) : (
          <p className='text-center italic text-gray-500'>
            Aucune donnée disponible
          </p>
        )}
      </div>
    </div>
  )
}

export default Charts
