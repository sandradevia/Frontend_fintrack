export {}; // membuat file jadi module

// // src/pages/Dashboard.tsx
// import React, { useState, useEffect } from 'react'
// import { Line, Bar } from 'react-chartjs-2'

// import CTA from 'example/components/CTA'
// import InfoCard from 'example/components/Cards/InfoCard'
// import PageTitle from 'example/components/Typography/PageTitle'
// import RoundIcon from 'example/components/RoundIcon'
// import Layout from 'example/containers/Layout'
// import response, { ITableData } from 'utils/demo/tableData'
// import { ChatIcon, CartIcon, MoneyIcon } from 'icons'

// import {
//   Chart as ChartJS,
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js'

// ChartJS.register(
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// )

// const chartOptions = {
//   responsive: true,
//   plugins: {
//     legend: { position: 'top' as const },
//     tooltip: {
//       callbacks: {
//         label: function (context: any) {
//           return `Rp. ${context.raw.toLocaleString('id-ID')}`
//         },
//       },
//     },
//   },
//   scales: {
//     y: {
//       ticks: {
//         callback: function (value: number) {
//           return `Rp. ${value.toLocaleString('id-ID')}`
//         },
//       },
//     },
//   },
// }

// const lineData = {
//   labels: ['Jan', 'Feb', 'Mar', 'Apr'],
//   datasets: [
//     {
//       label: 'Pemasukan',
//       data: [10000000, 12000000, 15000000, 17000000],
//       borderColor: '#10b981',
//       backgroundColor: 'rgba(16, 185, 129, 0.2)',
//       fill: true,
//       tension: 0.4,
//     },
//   ],
// }

// const barData = {
//   labels: ['Cabang 1', 'Cabang 2', 'Cabang 3'],
//   datasets: [
//     {
//       label: 'Pengeluaran',
//       data: [4000000, 5000000, 3000000],
//       backgroundColor: '#ef4444',
//     },
//     {
//       label: 'Pemasukan',
//       data: [10000000, 11000000, 9000000],
//       backgroundColor: '#3b82f6',
//     },
//   ],
// }

// function Dashboard() {
//   const [page, setPage] = useState(1)
//   const [data, setData] = useState<ITableData[]>([])

//   const resultsPerPage = 10
//   const totalResults = response.length

//   function onPageChange(p: number) {
//     setPage(p)
//   }

//   useEffect(() => {
//     setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage))
//   }, [page])

//   return (
//     <Layout>
//       <PageTitle>Main Dashboard</PageTitle>

//       <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
//         <InfoCard title="Pemasukan" value="Rp. 12.000.000,00">
//           {/* @ts-ignore */}
//           <RoundIcon icon={MoneyIcon} iconColorClass="text-green-500 dark:text-green-100" bgColorClass="bg-green-100 dark:bg-green-500" className="mr-4" />
//         </InfoCard>
//         <InfoCard title="Pengeluaran" value="Rp. 5.000.000,00">
//           {/* @ts-ignore */}
//           <RoundIcon icon={CartIcon} iconColorClass="text-red-500 dark:text-red-100" bgColorClass="bg-red-100 dark:bg-red-500" className="mr-4" />
//         </InfoCard>
//         <InfoCard title="Saldo" value="Rp. 7.000.000,00">
//           {/* @ts-ignore */}
//           <RoundIcon icon={MoneyIcon} iconColorClass="text-blue-500 dark:text-blue-100" bgColorClass="bg-blue-100 dark:bg-blue-500" className="mr-4" />
//         </InfoCard>
//         <InfoCard title="Jumlah Cabang" value="4">
//           {/* @ts-ignore */}
//           <RoundIcon icon={ChatIcon} iconColorClass="text-purple-500 dark:text-purple-100" bgColorClass="bg-purple-100 dark:bg-purple-500" className="mr-4" />
//         </InfoCard>
//       </div>

//       <div className="grid gap-6 mb-8 md:grid-cols-2">
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
//           <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">Tren Keuangan Tahunan</h4>
//           <p className="text-2xl font-bold text-blue-600 mb-2">Rp. 468.000.000,00</p>
//           <Line data={lineData} options={chartOptions} />
//         </div>
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
//           <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">Tren Keuangan</h4>
//           <Bar data={barData} options={chartOptions} />
//         </div>
//       </div>

//       <PageTitle>Dokumentasi Cabang</PageTitle>
//       <div className="grid gap-4 mb-8 md:grid-cols-2 xl:grid-cols-4">
//         {[1, 2, 3, 4].map((index) => (
//           <div key={index} className="rounded-lg bg-white dark:bg-gray-800 shadow p-4">
//             <div className="mb-2 text-lg font-semibold">Cabang {index}</div>
//             <div className="text-sm text-gray-600 dark:text-gray-400">
//               {index === 1 && 'Klojen'}
//               {index === 2 && 'Lowokwaru'}
//               {index === 3 && 'Junrejo'}
//               {index === 4 && 'Blimbing'}
//             </div>
//           </div>
//         ))}
//       </div>
//     </Layout>
//   )
// }

// export default Dashboard
